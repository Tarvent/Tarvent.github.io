---
title: "从 H.264 到 LL-HLS：关键帧、GOP、TS、MediaMTX 一次理清"
description: "整理 H.264 的 I/P/B 帧、Keyframe、GOP、MPEG-TS、MediaMTX 以及 HLS/LL-HLS 的关系，并记录 TS merge 与 FIFO pacing 测试中的关键理解。"
pubDate: "2026-09-14"
legacyDate: "2026-09-14"
tags: ["H.264", "MPEG-TS", "HLS", "LL-HLS", "MediaMTX", "video"]
categories: ["video", "streaming", "study"]
legacySlug: "h264-mpegts-hls-llhls-notes"
draft: false
---

最近在调查 LL-HLS 和 MediaMTX 时，我发现最容易混淆的不是某一个参数，而是几个层级经常被混在一起：**Frame、GOP、H.264、MPEG-TS、Segment、Part**。

这篇笔记从最基础的地方开始，把它们一次串起来。

## 1. 整体链路

```text
现实画面
  ↓
相机产生原始像素（YUV / RGB）
  ↓
H.264 Encoder
  ↓
H.264 码流（I / P / B frame、GOP）
  ↓
MPEG-TS Mux
  ↓
.ts / TS packets
  ↓
FFmpeg / MediaMTX
  ↓
HLS / LL-HLS
  ↓
hls.js / 浏览器播放
```

最重要的是先分层：

- **H.264**：决定视频怎么压缩、帧之间怎么依赖、关键帧在哪里。
- **MPEG-TS**：负责把已经编码好的 H.264、音频、时间戳等封装起来。
- **MediaMTX**：接收已有的视频流，再输出 HLS / LL-HLS 等协议。
- **hls.js**：浏览器端读取 playlist、segment / part 并播放。

## 2. Frame 是什么

视频本质上是一连串画面。

- 30fps = 每秒约 30 帧
- 60fps = 每秒约 60 帧

这里的 30fps / 60fps 只是帧率，不等于关键帧间隔。

### I-frame

I-frame 可以独立还原出完整画面。

不过它在文件中并不是 JPEG 或 PNG，而仍然是 **H.264 编码后的二进制数据**。

```text
现实画面
  ↓ H.264 编码
I-frame 二进制数据
  ↓ 解码
完整画面
```

可以把它理解成：**经过压缩，但可以独立解码的完整快照。**

### P-frame

P-frame 主要参考之前已经解码的画面，只记录变化。

```text
I：完整记录“车在左边”
P：车向右移动了一点
P：车又向右移动了一点
```

所以 P-frame 通常比 I-frame 小，但它依赖前面的参考帧。

### B-frame

B-frame 是 Bidirectional Predicted Frame，可以利用前后的参考帧进行预测。

```text
I   B   B   P
```

简单记忆：

- I：自己就能还原
- P：主要参考过去
- B：可以参考过去 + 未来

B-frame 也解释了为什么视频里会有 PTS / DTS：

- **DTS**：什么时候解码
- **PTS**：什么时候显示

## 3. Keyframe、I-frame、IDR

日常讨论里常常把 **I-frame ≈ Keyframe** 简化理解。

更严格地说，在 H.264 中真正适合作为随机访问起点的通常是 **IDR frame**。

学习阶段可以先记：

> Keyframe / IDR 是播放器可以安全地从这里重新开始解码的重要边界。

关键帧由 **H.264 编码器** 在编码阶段决定，而不是 TS 决定的。

常见影响因素包括：

- GOP 长度 / keyframe interval
- 场景切换检测
- 外部强制插入关键帧
- 最大关键帧间隔

## 4. GOP 是什么

GOP = Group of Pictures。

最直观的理解是：

> 从一个关键帧开始，到下一个关键帧之前的一组视频帧。

```text
I P P P P | I P P P P | I ...
└─ GOP 1 ─┘ └─ GOP 2 ─┘
```

常用估算公式：

```text
关键帧间隔（秒） ≈ GOP 帧数 ÷ FPS
```

例如：

| FPS | GOP | 关键帧间隔 |
|---:|---:|---:|
| 30 | 30 | 约 1 秒 |
| 30 | 60 | 约 2 秒 |
| 60 | 60 | 约 1 秒 |
| 60 | 120 | 约 2 秒 |

所以：

- 30fps 不等于 GOP=30
- 60fps 不等于 GOP=60
- FPS 决定每秒多少张画面
- GOP 决定关键帧之间大约隔多少帧

## 5. H.264 怎么变成 TS

H.264 编码后已经是一串二进制码流：

```text
I P P B P ...
↓
H.264 bitstream
```

MPEG-TS 再把这些数据与音频、时间戳等一起封装。

```text
H.264 video
   +
Audio
   +
PTS / DTS 等信息
   ↓
MPEG-TS Mux
   ↓
TS packets
```

典型 MPEG-TS packet 是 **188 bytes**。

因此一个 `.ts` 文件通常包含大量 TS packet，也会包含很多视频 frame。

> **一个 TS 文件绝对不等于一帧。**

例如 30fps 的 1 秒视频，里面大约会有 30 个 frame。

## 6. TS 一定从 I-frame 开始吗

不一定。

MPEG-TS 本身并没有规定“每个 TS 文件必须从 I-frame 开始”。

但在 HLS 这样的流媒体场景中，为了让播放器容易从 segment 边界开始解码，通常会尽量让 segment 与关键帧 / IDR 边界对齐。

```text
Segment 1: I P P P ...
Segment 2: I P P P ...
```

所以要分清：

- TS 是容器
- GOP / keyframe 是 H.264 码流内部结构
- HLS segment 是流媒体系统切出来的播放单位

这三个不是同一个东西。

## 7. MediaMTX 和关键帧

MediaMTX 不会凭空制造 H.264 关键帧，它主要读取输入流里已经存在的关键帧 / IDR，并据此组织 HLS segment。

因此配置一个目标 segment duration，并不等于“时间一到就完全无视 H.264 结构强行切”。

如果 IDR 间隔比较长，segment 的实际长度也可能受它影响。

例如：

```text
0s                    2s
I P P P P P P P P P P I
```

这种情况下，即使希望 segment 较短，也不能把 GOP / IDR 的结构完全忽略掉。

## 8. HLS 和 LL-HLS 的核心区别

普通 HLS 更接近：

```text
先生成完整 Segment
      ↓
发布 playlist
      ↓
播放器下载 Segment
      ↓
播放
```

Segment 越长，播放器越容易需要等更久。

LL-HLS 的关键改进是把一个 Segment 再拆成更小的 **Part**：

```text
Segment
├─ Part 1
├─ Part 2
├─ Part 3
└─ Part 4
```

播放器不用等整个 Segment 全部结束，就能更早拿到已经生成的 Part。

同时还会配合：

- **Blocking Playlist Reload**：下一块数据出现后立即返回，减少无效轮询
- **Preload Hint**：提前告诉播放器下一块资源大概在哪里

因此 LL-HLS 的核心可以总结成：

> **完整 Segment 还没有全部生成完，就可以通过更小的 Part 边生成、边传输、边播放。**

## 9. Segment 和 Part 不一样

```text
HLS Segment
├─ LL-HLS Part
├─ LL-HLS Part
└─ LL-HLS Part
```

- **Segment**：与 GOP / keyframe 边界关系更强
- **Part**：Segment 内部更细粒度的数据块，不要求每一个 Part 都从新的 I-frame 开始

这也是 LL-HLS 能把延迟进一步压低的重要原因。

## 10. 为什么简单 merge 两个 TS 并不能制造 2 秒 GOP

假设原本有两个 1 秒 TS：

```text
file4: I P P P ...
file5: I P P P ...
```

如果只是：

```sh
cat file4.ts
cat file5.ts
```

连续写进 FIFO，得到的逻辑仍然类似：

```text
I P P P ... I P P P ...
```

**第二个关键帧不会因为 `cat` 自动消失。**

所以：

> 两个 1 秒 TS 拼在一起，不等于制造了一个“只有一个关键帧的 2 秒 GOP”。

如果 FFmpeg 仍然是：

```text
-c:v copy -c:a copy
```

说明视频没有重新编码，原有的 GOP / keyframe 结构基本会被保留下来。

## 11. merge 测试真正暴露的是 pacing 问题

当前 feeder 的逻辑如果类似：

```sh
cat file4
cat file5
sleep 1
```

就意味着：

- 一次送进了约 **2 秒的视频内容**
- 现实时间却只等待 **1 秒**

也就是：

```text
现实时间 +1 秒
视频内容 +2 秒
```

如果不断重复，视频内部时间就会越来越跑在 wall-clock time 前面。

| 现实经过 | 已送入的视频内容 |
|---:|---:|
| 1 秒 | 约 2 秒 |
| 2 秒 | 约 4 秒 |
| 3 秒 | 约 6 秒 |

因此这次 merge 测试真正验证出来的是：

> **FIFO 输入侧的供给节奏（pacing）异常。**

而不是成功模拟了：

> **真实相机输出“2 秒内容、只有一个关键帧的单一 GOP”。**

如果要真正构造后者，需要重新编码，或者使用能够改变 GOP / keyframe 结构的方式处理视频，而不是简单做字节拼接。

## 12. 最容易混淆的问题

### 一个 TS = 一个 frame？

不是。一个 TS 可以包含几十甚至更多 frame。

### 一个 TS = 一个 GOP？

也不一定。TS 是容器，一个 TS 里可以有一个或多个 GOP，也可能从 GOP 中间开始。

### I-frame 是图片文件吗？

不是。它仍然是一串 H.264 二进制数据，但可以独立解码成完整画面。

### 30fps 就代表每 30 帧一个关键帧吗？

不是。30fps 只是每秒 30 帧，关键帧间隔取决于 GOP / 编码器设置。

### 两个 1 秒 TS 拼起来就是 2 秒 GOP 吗？

不是。两个文件里的原有关键帧仍然存在，简单拼接不会自动重建 GOP。

### LL-HLS 为什么延迟更低？

因为它不用等完整 Segment 才开始传输，而是通过更小的 Part 更早把已经生成的数据交给播放器。

## 13. 一张图记住所有层级

```text
30fps 摄像头
│
├─ Frame：每秒约 30 张画面
│    I / P / B
│
├─ GOP：一组互相关联的视频帧
│    I P P P ... | I P P ...
│
├─ H.264：编码 / 压缩这些 Frame
│
├─ MPEG-TS：把 H.264 + 音频 + 时间戳封装起来
│
├─ MediaMTX：读取输入流 → 输出 HLS / LL-HLS
│
├─ Segment：较大的播放单位，受 keyframe / GOP 影响
│
├─ Part：LL-HLS 中更小的低延迟传输单位
│
└─ hls.js：浏览器端请求并播放
```

## 总结

一句话概括：

> **H.264 决定“视频帧如何编码以及关键帧在哪里”；TS 决定“这些编码数据怎么装”；MediaMTX 决定“怎么把已有的流组织成 HLS / LL-HLS”；LL-HLS 再通过 Part 让播放器不用等完整 Segment 就能更早开始拿数据。**

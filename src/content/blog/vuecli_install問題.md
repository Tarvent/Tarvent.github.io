---
title: "MAC OS安装vue，vue commandない　ー　解決方法"
description: "MAC OS安装vue，vue commandない　ー　解決方法：Tarvent 的个人学习与实践记录。"
pubDate: "2022-02-20"
legacyDate: "2022-02-20"
tags: ["vue","学习"]
categories: ["vue3.2","macos"]
legacySlug: "vuecli_install問題"
draft: false
cover: "/media/pexels-beth-easton-2433985.jpg.webp"
---亲测！
# 问题
## 安装vue，始终找不到命令
```
npm install -g @vue/cli
```
## 安装顺利，使用发现不存在
```
command vue 不存在
```
## 解决方法
```
npm root -g
```
正常的路径应该是 /usr/local/lib/node_modules，如果你的不是就要重新指定：
```
npm config set prefix /usr/local

```

# Advice

不要用sudo 而是用包管理工具 ex: homebrew

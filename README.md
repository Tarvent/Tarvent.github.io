# Tarvent Blog

Tarvent 的个人博客源码，使用 Astro 构建，通过 GitHub Actions 发布到 GitHub Pages。

## 内容结构

- `src/content/blog/`：24 篇整理后的 Markdown，其中 1 篇为草稿
- `src/pages/`：首页、文章、项目与关于页面
- `public/media/`：压缩后的非个人封面图片
- `public/post-assets/`：文章专属图片
- `scripts/migrate-content.mjs`：从旧 Hexo 工程重新导入内容

## 发布目标

目标仓库为 `Tarvent/Tarvent.github.io`，站点地址为 `https://tarvent.github.io/`。

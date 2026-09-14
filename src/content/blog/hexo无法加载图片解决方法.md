---
title: "hexo无法加载图片解决方法"
description: "hexo无法加载图片解决方法：Tarvent 的个人学习与实践记录。"
pubDate: "2022-07-21"
legacyDate: "2022-07-21"
tags: ["博客"]
categories: ["blog"]
legacySlug: "hexo无法加载图片解决方法"
draft: false
cover: "/media/pexels-craig-adderley-1563355.jpg.webp"
---版本：Hexo 3以上　　
最近搭建hexo博客时遇到了图片部署后不显示的问题

上网找了很多方式都没有完美解决问题，后来查看了官方文档后终于解决了问题（完美解决）
建议以后大家遇到了问题也先去看看官方文档：https://hexo.io/zh-cn/docs

解决方案如下：

# 在根目录下配置文件_config.yml中

post_asset_folder:false改为true

这样在建立文件时，Hexo会自动建立一个与文章同名的文件夹，
这样就可以把与该文章相关的所有资源（图片）都放到那个文件夹里方便后面引用。
- ps:使用命令行创建会自动建立同名文件夹,不使用命令行不会自动创建，可以自己创建文件夹
　
```js
hexo n 文件名
```

# git bash安装插件
```js
npm install https://github.com/7ym0n/hexo-asset-image --save
```
- （这是个修改过的插件，经测试无问题），使用这个插件来引入图片，而不是网上那些方法里说的用传统md语法相对路径的方法。

# 插入图片时用这种方式

```js
![This is an test image](/post-assets/hexo%E6%97%A0%E6%B3%95%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95/test.jpg)
```
- 其中test.jpg就是要引用的图片，后面的This is an test image是图片描述，可以自己修改(可以删除，不需要)。

# 这样就能成功显示了 
```js
hexo cl 
hexo g 
hexo d
```

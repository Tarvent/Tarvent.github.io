---
title: "vue3部署githubpage空白"
description: "vue3部署githubpage空白：Tarvent 的个人学习与实践记录。"
pubDate: "2022-05-31"
legacyDate: "2022-05-31"
tags: ["record","study"]
categories: ["github"]
legacySlug: "vue3项目部署githubpage空白"
draft: false
cover: "/media/pexels-mohamed-sarim-1033729.jpg.webp"
---# 问题
在页面完成后，打包上线页面出现白屏问题。百度到的，解决办法是，改变config文件夹下，index.js中，build下的 assetsPublicPath："/" => assetsPublicPath："./"。
随后发现创建的是vue3的项目没有config文件夹。
# 解决方法
在项目根目录，创建 vue.config.js 文件，文件内容如下：
```
module.exports={
    publicPath:"./"
}
```

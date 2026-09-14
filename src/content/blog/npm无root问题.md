---
title: "全局安装npm包报错没有权限"
description: "全局安装npm包报错没有权限：Tarvent 的个人学习与实践记录。"
pubDate: "2021-06-14"
legacyDate: "2021-06-14"
tags: ["记录","frontend","問題"]
categories: ["npm"]
legacySlug: "npm无root问题"
draft: false
cover: "/media/03.jpg.webp"
---# npm 安装时提示没有权限
```
npm ERR! code EACCES
npm ERR! syscall rename
npm ERR! path /usr/local/lib/node_modules/npm
npm ERR! dest /usr/local/lib/node_modules/.npm-i9nnxROI
npm ERR! errno -13

```
发现 node_module 的所有者是 root 下的

# 换下目录所有者
```
sudo chown -R anna: /usr/local/lib/node_modules
chown 命令是将指定文件的拥有者改为指定的用户或组
参数 -R 处理指定目录以及其子目录下的所有文件
具体可以看下 chown 命令的介绍：www.cnblogs.com/peida/archi…
```
# ok
这样 /usr/local/lib/node_modules 目录的所有者就更换完毕了，可以正常在全局安装 npm 包。

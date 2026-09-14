---
title: "MACOS配置MySQL(最新)"
description: "MACOS配置MySQL(最新)：Tarvent 的个人学习与实践记录。"
pubDate: "2022-09-02"
legacyDate: "2022-09-02"
tags: ["study","学习笔记"]
categories: ["MySQL"]
legacySlug: "MACOS_MySQL配置（最新）"
draft: false
cover: "/media/wallhaven-6krkyl.jpg.webp"
---# MACOS配置MySQL
安装成功后，使用mysql命令回报：command not found 的错误，是因为还没有配置环境变量。配置环境变量首先要知道你使用的Mac OS X是什么样的Shell，打开终端，输入：echo $SHELL 回车执行如果输出的是：csh或者是tcsh，那么你用的就是C Shell。如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。Mac OS X 10.2之前默认的是C Shell。Mac OS X 10.3之后默认的是Bourne Shell。我的是bash。

输入：`cd /usr/local/mysql`，回车执行然后输入：`sudo vim .bash_profile` ，回车执行需要输入root用户密码。sudo是使用root用户修改环境变量文件。进入编辑器后，我们先按"i”，即切换到“插入”状态。就可以通过上下左右移动光标，或空格、退格及回车等进行编辑内容了，和WINDOWS是一样的了。(注意文件位置)

在文档的最下方输入：
```
export PATH=${PATH}:/usr/local/mysql/bin`
```
然后按Esc退出insert状态，并在最下方输入:wq保存退出(或直接按`shift+zz`，或者切换到大写模式按ZZ，就可以保存退出了)。最后输入：
```
source .bash_profile
```
回车执行，运行环境变量。再输入mysql命令，
```
mysql -u root -p
```
即可使用。

输入
```
show databases;
```
如果显示数据库就代表安装成功了。就代表安装成功了。

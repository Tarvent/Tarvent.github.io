---
title: "在一个电脑上使用两个github账号"
description: "On one computer control two github accounts"
pubDate: "2023-07-05"
legacyDate: "2023-07-05"
tags: ["github"]
categories: ["github"]
legacySlug: "oneComputerTwogithub"
draft: true
---公司电脑上默认使用的是公司的github账号，如果希望写一些代码放到个人的github账号上，就需要配置让一个电脑上可以使用两个github账号

原理：管理两个SSH key

1.生成两个SSH KEY

为个人账户生成SSH KEY:
~~~
ssh-keygen -t rsa -C "your-self-email-address" -f /c/Users/Administrator/.ssh/id_rsa
~~~
为公司github账户生成SSH KEY：
~~~
$ ssh-keygen -t rsa -C "your-work-email-address" -f /c/Users/Administrator/.ssh/id_rsa_work
~~~
2.分别把id_rsa.pub和id_rsa_work.pub中的内容加到对应github的账号中，添加到Settings的SSH and GPG Keys中

3.把key加到ssh agent上
~~~
$ ssh-add ~/.ssh/id_rsa
$ ssh-add ~/.ssh/id_rsa_work
可以通过ssh-add -l来确认结果
~~~
4.配置.ssh/config
~~~
#one(self-email@.com)
  Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa
  User one#two(work-email@xxx.com)
  Host github_work.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_work
  User two
~~~
5.在~/.ssh下运行
~~~
~~~
$ ssh git@github.com或者
$ssh git@github_work.com
~~~


5.这样github.com对应的是自己的gihub账号，github_work.com对应的是公司的github账号
~~~
$ git init
$ git commit -m 'xxxx'#push到github上
$ git remote add origin git@github.com:xxxx/test.git
$git push origin master
~~~

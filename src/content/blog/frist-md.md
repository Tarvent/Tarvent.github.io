---
title: "Blog（hexo+git）"
description: "Blog（hexo+git）：Tarvent 的个人学习与实践记录。"
pubDate: "2018-03-30"
legacyDate: "2018-03-30"
tags: ["记录","博客","学习"]
categories: ["blog"]
legacySlug: "frist-md"
draft: false
cover: "/media/03.jpg.webp"
---一、安装

首先，需要安装node.js、npm和Git

Git可直接下载安装包进行安装。点击下载。安装后，需要下载xcode才可以。否则在使用中会遇到错误。这里我出现的问题是起初没有下载xcode，在后面初始化的时候，一直提示找不到Git，下载了xcode也不行，后来我打开了xcode，然后在关闭，就可以了。因为是小白，具体原因不明
接下来安装node.js。打开终端，输入命令
npm install -g hexo-cli
这里遇到的问题是，提示没有权限，于是在上面的命令增加了sudo，如下:

sudo npm install -g hexo-cli
然后安装node.js。我也是直接下载安装程序来进行安装的。点击下载
安装完后，可输入以下命令进行检查，输入每个命令后，都会弹出相应版本号。
node -v

npm -v

Git --version
然后在进行安装hexo，输入以下命令即可，遇到的问题与安装node.js类似。所以直接加了sudo

sudo npm install -g hexo
二、博客初始化

首先创建一个文件夹，该文件夹用于存储博客的文件。然后通过终端，进入到该文件夹，命令如下：

cd youblogfiles
然后初始化本地博客，输入以下命令。初始化时，切记文件夹要空的才可以，否则会初始化失败。若失败了建议删除文件夹在重新创建。

hexo init
完成后在进行安装npm

sudo npm install
执行下述命令生成本地网页文件并开启服务器，然后通过http://localhost:4000查看本地博客。

hexo g
hexo s
三、上传代码

注册并登陆GitHub账号后，新建仓库，名称必须为 user.github.io，如 hxf236386915.github.io。 打开文件_config.yml，翻到最底下，将下面代码复制进去。

deploy:
  type: git
  repository: https://github.com/hxf236386915/hxf236386915.github.io.git
  branch: master
其中将repository中hxf236386915改为自己的用户名，注意type、repository、branch后均有空格。通过如下命令在youblogfiles下生成静态文件并上传到服务器。

hexo g
hexo d
若执行hexo g出错则执行npm install hexo --save，若执行hexo d出错则执行npm install hexo-deployer-git --save。错误修正后再次执行hexo g和hexo d上传到服务器。

若未关联GitHub，执行hexo d时会提示输入GitHub账号用户名和密码，即:

username for 'https://github.com':
password for 'https://github.com':
hexo d执行成功后便可通过https://hxf236386915.github.io访问博客，看到的内容和http://localhost:4000相同。

四、添加ssh keys 到github

添加ssh key后不需要每次更新博客再输入用户名和密码。首先检查本地是否包含ssh keys。如果存在则直接将ssh key添加到GitHub之中，否则新生成ssh key。

输入一下代码，之后按照要求输入账号和两次密码

ssh-keygen -t rsa -C "your_email@exampl"
完成之后，打开博客文件夹，将your_email.pub中的内容复制到github中的设置-deploy keys中即可。

然后执行如下代码

hexo g
hexo d
五、绑定域名

首先，在博客文件夹中创建CNAME文件，不可以有后缀。然后将域名粘贴进文件中。并上传至github。

然后，在通过阿里云进行解析。详情如下

记录类型：CNAME
主机记录：@
解析线路：默认
记录值：http://hxf236386915.github.io
六、安装配置主题

这里使用的的是hexo中的theme主题。命令如下

cd youblogflie（你的博客文件夹）
git clone https://github.com/iissnan/hexo-theme-next themes/next
将blog目录下_config.yml里的theme的名称landscape更改为next。

执行如下命令（每次部署文章的步骤）

hexo g  //生成缓存和静态文件
hexo d  //重新部署到服务器
当本地博客部署到服务器后，网页端无变化时可以采用下述命令。

hexo clean  //清楚缓存文件(db.json)和已生成的静态文件(public)
配置主题可在主题官网中查看相应教程，需要注意的是站点配置文件和主题配置文件。点击进入next官网

站点配置文件就是博客文件夹目录下的_config.yml。 主题配置文件为，博客文件夹-theme-next下的_config.yml

七、写作

首先创建一个md文件，命令如下：

hexo new 文件名
然后在博客文件夹目录下的source-_posts打开。

title：代表标题

date：日期

tags：[标签1，标签2]

categories：分类

—

正文

超链接：

[F](https://houxuefeng.com)
图片：

![1](http://pvacs1eu6.bkt.clouddn.com/WechatIMG57.jpeg)
或者

<img src="http://pvacs1eu6.bkt.clouddn.com/WechatIMG57.jpeg" width = 100% div align=center/>
下面这个可以调整大小。

音乐：

<audio id="audio" autoplay="autoplay">
    <source src="http://qzone.haoduoge.com/music1/2015-04-23/1429774382.mp3" type="audio/mp3"></source>
</audio>
八、关于图床的问题

本人选择的是七牛云，注册登录后，创建存储。然后就可以上传图片了。在上传完图片后选择复制外链即可。

同时推荐一款工具叫ipic。可自行搜索下载。

九、其他

另外在修改配置的时候，可以使用hexo s 边修改边预览。

修改创建文章时的默认值，可修改博客文件目录下 scaffolds-post.md 即可。

以上。




hexo官网：https://hexo.io/zh-cn/docs/setup

必要组件：Node.js homebrew nvm(管理Node.js)
                  nvm参考：https://www.jianshu.com/p/a3f8778bc0a1

hexo主题 ：
1.https://hexo.fluid-dev.com/docs/  （fluid 好看）
2.http://theme-next.iissnan.com/getting-started.html （next 使用多）
3.https://www.haomwei.com/technology/maupassant-hexo.html#主题特性（至简）

图片来源：https://wallhaven.cc/toplist?page=2

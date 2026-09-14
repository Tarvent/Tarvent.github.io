---
title: "XS-Leaks attack through iframe counting"
description: "To analyze XS-Leaks, I used a specific attack method called \"iframe counting\" and implemented a phishing website to carry out the attack. The website's front-end and back-end were created using native JavaScript and Node.js."
pubDate: "2023-01-17 00:53:23"
legacyDate: "2023-01-17"
tags: ["Research"]
categories: ["web security"]
legacySlug: "XS-Leaks攻击"
draft: false
---# Master research

# XS-leaks attack through iframe 

用户打开页面，window.open会打开目标网站的登录页面，js代码记录打开网址后控制台输出iframe数量，过一段时间后再次输出iframe数量，将两次iframe数打印到表单，表单再传输给node服务器记录到数据库

The target website’s after login uses iframe, and the number of iframes is different from the number of iframes on the login page.

- Window.open()

The `window.open()` method is a JavaScript method that allows a web page to open a new browser window or a new tab in the same browser window. It can be used to open a new window with a specified URL, or to open a new window with a specified size and appearance.

The `window.open()` method takes several arguments, including the URL of the page to be opened, the name of the window or frame, and the features of the window (such as the size, location, and whether it should have a toolbar or menu). For example:

```js
window.open('https://www.example.com', 'myWindow', 'width=400,height=300');
```

This will open a new window with the specified dimensions and the URL `https://www.example.com`. The `window.open()` method can be used to open a new window in response to a user action, such as clicking a link or button. It can also be used to open a new window programmatically, for example, to display a login form or to display additional information about a product.

- Frame Counting 

Access the frame's **[window.length](https://developer.mozilla.org/en-US/docs/Web/API/Window/length)** property which is used to retrieve the number of frames (IFRAME or FRAME) in the window.

**Methods**: Frames, Pop-ups

**Difference**: Page Content

**Summary:** Read number of frames (window.length).

## 怎么样获取页面上iframe 数量

需要使用window.length, 或者window.frames.length;

如果页面中不包含frame和iframe元素, 则返回0;



# iframe 相关

- iframe使用场景

  [iframe](https://so.csdn.net/so/search?q=iframe&spm=1001.2101.3001.7020)可用在以下几个场景中：
  1.典型系统结构，左侧是功能树，右侧就是一些常见的table或者表单之类的。为了每一个功能，单独分离出来，采用iframe.
  2.[ajax](https://so.csdn.net/so/search?q=ajax&spm=1001.2101.3001.7020)上传文件
  3.加载别的网站内容，例如google广告，网站流量分析。
  4.在上传图片时，不用flash实现无刷新。
  5.跨域访问的时候可以用到iframe，使用iframe请求不同域名下的资源。

- Iframe 的好处

  1.iframe是一种html封装，方便相同功能的网页复用代码，可以一定程度上减少开发量，不失为一种代码复 用的好计策；

  2.iframe包含的代码几乎不会受到外界任何js或者css的影响（非常牛B的优点），可谓独树一帜，很任性；这种特点能减少很 多因为复用代码时，导致的css或者是js冲突，调试过程可谓痛苦，而且多半还要在错综复杂的关系纠葛中进 行修改，不小心可能会引入新的问题，iframe完全可以避免这种问题；

  ---

  1.iframe能够把嵌入的网页原样展现出来；

  2.模块分离，便于更改，如果有多个网页引用iframe，只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷；

  3.网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，增加代码的可重用；

  4.如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决；

  5.重载页面时不需要重载整个页面，只需要重载页面中的一个框架页；

  6.方便制作导航栏。

- **缺点:** 

  1.样式和脚本需要额外链入，调用外部页面,需要额外调用css,增加页面额外的请求次数，增加服务器的http请求；

  2.代码复杂，在网页中使用框架结构最大的弊病是搜索引擎的“蜘蛛”程序无法解读这种页面，会影响搜索引擎优化，不利于网站排名；

  3.框架结构有时会让人感到迷惑，滚动条除了会挤占有限的页面空间外会使iframe布局混乱，还会分散访问者的注意力，影响用户体验；

  4.链接导航疑问。运用框架结构时，必须保证正确配置所有的导航链接，否则，会给访问者带来很大的麻烦。比如被链接的页面出现在导航框架内，这种情况下访问者便被陷住了，因为此时他没有其他地点可去； 

  5.产生多个页面，不易管理；

  6.多数小型的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。

# 开发记录(原生nodejs实现)

攻击者页面内配置乐天旅行的登录界面

用window.open() 打开登录界面

JavaScript记录iframe数，用户登录之后再记录iframe数

控制台信息打印在页面div标签（js实现）

nodejs服务端将iframe信息写入json储存

通过iframe的变化判断用户是否登录页面



# Attack flow window.open()

Get iframe of the page 

攻击页面html + javascript / 后台Node.js

- 使用window.open通常认为是一个不构成危险的选择?

  Exploiting XS-Leaks with `window.open` is generally seen as the least appealing option for an attacker because the user can see it happen in the open browser window. However, it’s usually the right technique when:

- 我想我的前端页面和方式可以更好的欺骗用户

## html页面

- 前端功能

1. window.open()打开对应网站登录界面
2. js会读取iframe的数，用户登录后再记录iframe数
3. 将控制台打印的iframe数输出在div标签中,css设置了flex大小
4. submit按钮后将iframe数输出给后台

- 后端实现
1. node.js 传参到服务器

# Chrome->Real world Test（登録ページ）

- The 9 most popular types of websites and what they include

1. [Business](https://en.99designs.jp/blog/web-digital/types-of-websites/#Business)
2. [Ecommerce](https://en.99designs.jp/blog/web-digital/types-of-websites/#Ecommerce)
3. [Blogs/news](https://en.99designs.jp/blog/web-digital/types-of-websites/#Blogs)
4. [Portfolio](https://en.99designs.jp/blog/web-digital/types-of-websites/#Portfolio)
5. [Service provider (streaming, online tools, etc.)](https://en.99designs.jp/blog/web-digital/types-of-websites/#Serviceprovider)
6. [Landing page](https://en.99designs.jp/blog/web-digital/types-of-websites/#Landingpage)
7. [Wiki/database](https://en.99designs.jp/blog/web-digital/types-of-websites/#Wiki)
8. [Forum](https://en.99designs.jp/blog/web-digital/types-of-websites/#Forum)
9. [Event](https://en.99designs.jp/blog/web-digital/types-of-websites/#Event)

## 安全及隐私考虑 后端代码及测试例子省略



# Firefox,safari





# Real world Test（）


# 研究plan

- [x] 他の登録ページをテストする

- [x] 登録ページだけではなく,他の種類ページもテストする

# テストページを作る

- Login page 


# 防御方法

---
title: "JavaScript get hour, minute and millisecond"
description: "JavaScript get hour, minute and millisecond：Tarvent 的个人学习与实践记录。"
pubDate: "2022-10-01"
legacyDate: "2022-10-01"
tags: ["study","学习笔记"]
categories: ["javascript"]
legacySlug: "js(javascript)取得当前时间小时，分钟，秒 以及毫秒"
draft: false
cover: "/media/wallhaven-6krkyl.jpg.webp"
---首先 我们需要new一个date对象：

~~~js
var d = new date();
~~~

随后，取得当前时间小时：

~~~js
d.getHours();
~~~

取得当前分钟:

~~~js
d.getMinutes();
~~~

取得当前秒

~~~js
d.getSeconds();
~~~

取得当前毫秒

~~~js
d.getMilliseconds();
~~~

全部代码如下：

~~~js
<script type="text/javascript>

var d = new Date();
document.write('<br /> 当前时间的小时：'+d.getHours());
document.write('<br /> 当前时间的分钟:'+d.getMinutes());
document.write('<br /> 当前时间的秒:'+d.getSeconds());
document.write('<br /> 当前时间的毫秒:'+d.getMilliseconds());
</script>
~~~

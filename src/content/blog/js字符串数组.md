---
title: "JavaScript字符串数组"
description: "JavaScript字符串数组：Tarvent 的个人学习与实践记录。"
pubDate: "2022-04-30"
legacyDate: "2022-04-30"
tags: ["study","学习笔记"]
categories: ["javascript"]
legacySlug: "js字符串数组"
draft: false
cover: "/media/wallhaven-6krkyl.jpg.webp"
---# js字符串替换

在JavaScript中，字符串是不可变的

需要自己定义`replaceAt()`

1.

```js
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

```

```js
var hello="Hello World";
alert(hello.replaceAt(2, "!!")); //should display He!!o World
```

2.

```js
const replaceStr1 = (str, index, char) => {
    const strAry = str.split('');
    strAry[index] = char;
    return strAry.join('');
  }
  replaceStr(str1, 4, '-'); // => Good-Morning
  replaceStr(str2, 4, '-'); // => Hell- World
```

# js字符转数组

```js
// 第一种 split拆分 "abc".split('') ==> ["a","b","c"] 
// 第二种 [...] [..."abc"] ==> ["a","b","c"] Array.from("abc") ==> ["a","b","c"]

lines[i].split('')；
```

# js 截取前后字符

前

```js
//前
publicstaticvoidsubstringTest01(){
    String str = "http_https://www.baidu.com/";
    //截取_之前字符串
    String str1 = str.substring(0, str.indexOf("_"));
    System.out.println("截取_之前字符串:"+str1);
}
```

后

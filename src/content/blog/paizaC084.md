---
title: "paiza --C084"
description: "paiza --C084：Tarvent 的个人学习与实践记录。"
pubDate: "2022-03-14"
legacyDate: "2022-03-14"
tags: ["record","study","コードテスト"]
categories: ["刷题"]
legacySlug: "paizaC084"
draft: false
cover: "/media/Photo%20by%20Meiying%20Ng.jpg.webp"
---# Question
あなたは友人に向けてメールを送ろうとしています。
ただメールを送るだけではつまらないので、文字列を装飾して送ることにしました。
送りたい文字列の周囲を "+" で枠のように囲んで装飾します。

このような処理を手作業で行いたくないため、プログラムで装飾しようとしています。
この "+" の枠で囲む装飾をするプログラムを書いてください。

入力例 1 では "Paiza" という文字列を送ります。
この文字を枠で囲み装飾すると、以下のようになります。
```
+++++++
+Paiza+
+++++++
```

# Answer
```js
process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require('readline').createInterface({
input: process.stdin,
output: process.stdout
});
reader.on('line', (line) => {
lines.push(line);
});
reader.on('close', () => {
var N = lines[0].length + 2;
for(let i = 0; i < N; i++){
process.stdout.write('+');
}
console.log('\n+'+lines[0]+'+');
for(let j = 0; j < N ; j ++){
process.stdout.write('+');
}});
```

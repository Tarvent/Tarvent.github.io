---
title: "在 vue eslint 报错 error “Component name  should always be multi-word”，该怎么办？"
description: "在 vue eslint 报错 error “Component name  should always be multi-word”，该怎么办？：Tarvent 的个人学习与实践记录。"
pubDate: "2022-03-07"
legacyDate: "2022-03-07"
tags: ["vue","学习"]
categories: ["vue3.2"]
legacySlug: "vueelint报错multi-word"
draft: false
cover: "/media/wallhaven-96vr31.jpg.webp"
---# 出现的问题：
 在 vue-cli 创建的项目中，创建文件并命名后，会报  “Component name "****" should always be multi-word”报错；
 ```
 1:1  error  Component name "index" should always be multi-word  vue/multi-word-component-names

✖ 1 problem (1 error, 0 warnings)


webpack compiled with 1 error
```
# 报错的原因：
 在组件命名的时候不够规范，根据 ESLint 官方风格指南，除了根组件（App.vue）外，自定义组
件名称应该由多单词组成（使用大驼峰命名方式或者用“-”连接单词），防止和 html 标签冲突;
而最新的 vue-cli 创建的项目使用了最新的 vue/cli-plugin-eslint 插件，在 vue/cli-plugin-eslint v7.20.0
版本之后就引用了 vue/multi-word-component-names 规则，所以在编译的时候判定此次错误

# 方案一 ：重命名(亲测有效)
文件的名称重命名
修改组件名为多个单词，使用驼峰命名方式或者用“-”连接单词。
myUser

# 方案二 ：配置 .eslintrc.js文件（亲测有效）
おすすめ！！！
```
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 0,
    'space-before-function-paren': 0,
    'vue/multi-word-component-names':'off' //关闭命名规则，将不会校验组件名，官方建议设置是根据组件名进行忽略
  }
}
```

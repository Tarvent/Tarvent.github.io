---
title: "Install Xcode Command Line Tools"
description: "Install Xcode Command Line Tools：Tarvent 的个人学习与实践记录。"
pubDate: "2022-06-12"
legacyDate: "2022-06-12"
tags: ["记录","博客"]
categories: ["XCODE"]
legacySlug: "Install Xcode Command Line Tools"
draft: false
cover: "/media/03.jpg.webp"
---# Xcode Command Line Tools
- What are Xcode Command Line Tools

These are tools for software developers that run on the command line, that is, in the Terminal application (also called the console). These tools have been used for programming on Unix operating systems since computing's beginnings, serving as the foundation of almost all software development.

Out of the box, a Mac doesn't contain all of the software and tools needed for programming. Instead, Apple provides a complete development environment for programmers named Xcode, which is available separately for download and installation. The full Xcode package is huge, requiring over 40GB of disk space, and supports development for all Apple operating systems. Many software developers, particularly web application developers, are using Macs but aren't developing software for Apple devices. They still need the Unix-like tools and utilities installed with the Xcode package. Fortunately, Apple provides a separate and much smaller download, the Xcode Command Line Tools, that installs the most-needed utilities for software development. You can install this smaller package from the Terminal application or as part of installing Homebrew, the popular Mac package manager.

# With Homebrew

Most developers need additional programming languages and utilities that don't come installed on macOS and are not included in the Xcode Command Line Tools package. You can use Homebrew, the popular Mac package manager, to install almost any open source developer tool. Homebrew will install Xcode Command Line Tools as part of its installation process. Since you'll probably need Homebrew, you might as well let Homebrew install Xcode Command Line Tools for you. 

```JS
xcode-select --install 
xcode-select --version
```

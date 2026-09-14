---
title: "XS-Leaks 先行研究"
description: "XS-Leaks 先行研究：Tarvent 的个人学习与实践记录。"
pubDate: "2022-10-12"
legacyDate: "2022-10-12"
tags: ["study"]
categories: ["web security"]
legacySlug: "Cross-site-leaks研究"
draft: false
cover: "/media/pexels-mohamed-sarim-1033729.jpg.webp"
---# 先行研究 Previous Research
## cookie
```
- HTTP cookies are small blocks of data created by a web server while a user is browsing a website and placed on the user’s computer or some other device by the user’s web browser.
```

## same origin policy

```
For exapmle
This website's origin is http://www.example.com/dir/page.html 
where the protocol is https. 
The host is  www.example.com/dir/page.html, 
and the port is not specified.(80)


http://www.example.com/dir2/other.html ：    (same origin)
http://example.com/dir/other.html：             （different host）
http://v2.www.example.com/dir/other.html：（different host）
http://www.example.com:81/dir/other.html：（different port）
```


## cross-site leaks
1. Cross-Site Leaks (XS-Leaks) are vulnerabilities to side channel attacks on Web browsers. 
 
2. The type of side channel attacks on a web browser bypass security mechanism such as the same source policy.

3. Cross-Site Leaks describe a client-side bug that allows an attacker to collect side-channel information from a cross-origin HTTP resource. 

![](/post-assets/Cross-site-leaks%E7%A0%94%E7%A9%B6/Jietu20220927-145017.jpg)

## Error messages     
The execution context of a web application is defined through the concept of web origins. 
Web applications may call and embed other web applications to enhance functionality. 

By using CORS (Cross-Origin Resource Sharing ), An attacker can send an enabled request to a target website which redirects based on the user state. 

When the browser denies the request, the full URL of the redirect target is leaked in the error message. 

With this attack, it is possible to detect redirects, leak redirect locations, and sensitive query parameters. 

![](/post-assets/Cross-site-leaks%E7%A0%94%E7%A9%B6/Jietu20220927-145147.jpg)

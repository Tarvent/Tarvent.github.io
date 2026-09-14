---
title: "GitHub does not provide shell access"
description: "On the terimal \"You've successfully authenticated, but GitHub does not provide shell access."
pubDate: "2023-06-08"
legacyDate: "2023-06-08"
tags: ["github"]
categories: ["github"]
legacySlug: "githubshellaccess"
draft: false
---# Q
~~~text
$ git remote add origin git@github.com:lut/EvolutionApp.git
fatal: remote origin already exists.

$ git push -u origin master
fatal: '  ' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.


~~~
# My keys were added succesfully
~~~text
You've successfully authenticated, but GitHub does not provide shell access.
~~~
# Solve
Try and redefine the ssh url for remote origin:
~~~
git remote set-url origin git@github.com:name/projectname.git
~~~

Only git remote set-url can change an existing remote URL (as opposed to git remote add, to add a new remote name and URL). Here, the issue was the URL of the existing remote 'origin', EvolutionApp: it needed to be replaced by a valid one.
Using git config url."ssh://git@github.com/".insteadOf https://github.com/ would not have helped, considering there was no HTTPS URL in the first place.


# Finally
After input 
~~~text
ssh -T git@github.com
~~~

Although it still output 

~~~text
You've successfully authenticated, but GitHub does not provide shell access.
~~~
It just a notice .

---
collection: blog
title: My first blog post
author: borat
tags: 
  - example
hn: 
date: 2015-01-01

template: post.html
---

Hello world, this is my **first** blog post. As you can see this is a simple [markdown](http://daringfireball.net/projects/markdown/syntax) file with a [YAML front matter](http://jekyllrb.com/docs/frontmatter/).

We're also loading [Highlight.js](https://highlightjs.org/) to make code pretty:

```
for (var i=1; i <= 20; i++) {
    if (i % 15 == 0)
        console.log("FizzBuzz");
    else if (i % 3 == 0)
        console.log("Fizz");
    else if (i % 5 == 0)
        console.log("Buzz");
    else
        console.log(i);
}
```
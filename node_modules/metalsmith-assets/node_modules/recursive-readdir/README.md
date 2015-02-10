#recursive-readdir

[![Build Status](https://travis-ci.org/jergason/recursive-readdir.svg?branch=master)](https://travis-ci.org/jergason/recursive-readdir)

A simple Node module for recursively listing all files in a directory,
or in any subdirectories.

It does not list directories themselves.

Because it uses fs.readdir, which calls [readdir](http://linux.die.net/man/3/readdir) under the hood
on OS X and Linux, the order of files inside directories is [not guaranteed](http://stackoverflow.com/questions/8977441/does-readdir-guarantee-an-order).

##Installation

    npm install recursive-readdir

##Usage


```javascript
var recursive = require('recursive-readdir');

recursive('some/path', function (err, files) {
  // Files is an array of filename
  console.log(files);
});
```

It can also take a list of files to ignore.

```javascript
var recursive = require('recursive-readdir');

// ignore files named 'foo.cs' or files that end in '.html'.
recursive('some/path', ['foo.cs', '*.html'], function (err, files) {
  // Files is an array of filename
  console.log(files);
});
```

The ignore strings support Glob syntax via
[minimatch](https://github.com/isaacs/minimatch).

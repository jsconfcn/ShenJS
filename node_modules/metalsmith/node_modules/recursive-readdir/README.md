#recursive-readdir

A simple Node module for recursively listing all files in a directory,
or in any subdirectories.

It does not list directories themselves.

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

// ignore all files called 'foo.cs' or 'bar.html'.
recursive('some/path', ['foo.cs', 'bar.html'], function (err, files) {
  // Files is an array of filename
  console.log(files);
});

It doesn't do globbing, just a simple `indexOf` check against the filename.

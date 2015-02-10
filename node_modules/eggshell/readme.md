#eggshell

Just some sass file build on top of [node-bourbon](https://github.com/lacroixdesign/node-bourbon) project.


## Requirements
- [node](http://nodejs.org)
- [gulp.js](http://gulpjs.com) -or- [Grunt](http://gruntjs.com) -or- [node-sass](https://github.com/andrew/node-sass)

## Installation

To install as a development dependency, run:

```bash
$ npm install --save-dev eggshell
```

If you need it in production, replace `--save-dev` with `--save`.


## gulp.js Usage

Using the [gulp-sass](https://github.com/dlmanning/gulp-sass) plugin.

```
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('test.scss')
    .pipe(sass({
      includePaths: require('eggshell').includePaths
    }))
    .pipe(gulp.dest('dist'));
})

```

See more from the [example folder](https://github.com/Wiredcraft/eggshell/tree/master/example).

## License

MIT
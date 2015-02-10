var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('test.scss')
    .pipe(sass({
      includePaths: require('..').includePaths
    }))
    .pipe(gulp.dest('dist'));
})

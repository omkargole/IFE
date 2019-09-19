'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include')

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('css', function () {
  return gulp.src('./css/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('htmlminify', () => {
  return gulp.src('./template/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./src'));
});
gulp.task('fileinclude', function() {
  return gulp.src(['./src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', gulp.series('sass'));
  gulp.watch('./sass/components/*.scss', gulp.series('sass'));
  gulp.watch('./sass/base/*.scss', gulp.series('sass'));
  gulp.watch('./css/*.css', gulp.series('css'));
  gulp.watch('./src/index.html', gulp.series('fileinclude'));
  gulp.watch('./template/*.html', gulp.series('htmlminify'));
});

gulp.task('default', gulp.series('watch'));

// @@include('./dist/header.html')
// @@include('./dist/footer.html')
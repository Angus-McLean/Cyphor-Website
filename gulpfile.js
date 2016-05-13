//gulpfile.js

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('connect', function () {
  connect.server();
})

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('index.html');
  gulp.watch('js/');
  gulp.watch('css/');
})

// create a default task and just log a message
gulp.task('default', ['connect', 'watch']);

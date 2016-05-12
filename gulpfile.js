//gulpfile.js

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
  connect.server();
})


// create a default task and just log a message
gulp.task('default', ['connect']);

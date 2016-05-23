//gulpfile.js

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('connect', function () {
  connect.server({
	  port: 3000
  });
});

gulp.task('jsreload', function () {
	gulp.src('js/*.js')
		.pipe(livereload());
});

gulp.task('cssreload', function () {
	gulp.src('css/*.css')
		.pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('index.html');
  gulp.watch('js/*.js');
  gulp.watch('css/*.js');
});

// create a default task and just log a message
gulp.task('default', ['connect', 'watch']);

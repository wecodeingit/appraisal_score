var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var pm2 = require('pm2');

var processName ='server';

gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee ejs',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('pm2:stop',function() {
  pm2.connect(function(){
    pm2.stop("app.js",processName);
  });
});

gulp.task('pm2:start',function() {
    pm2.connect(function(){
    pm2.start("app.js",processName);
  });
});


gulp.task('dev', [
  'sass',
  'develop',
  'watch'
]);

gulp.task('prod', [
  'sass',
  'pm2:start'
]);


gulp.task('default', ['dev']);

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('run', function(){
  nodemon({
    script: 'bin/www',
    ext: 'js',
    env: {'NODE_ENV': 'development'}
  });
});

// copy js and css files
var files = [
  {src: 'node_modules/bootstrap/dist/**', dest: 'public/'},
  {src: 'node_modules/angular/angular.js', dest: 'public/js/'},
  {src: 'node_modules/angular-resource/angular-resource.js', dest: 'public/js/'},
  // {src: 'node_modules/js-md5/build/md5.min.js', dest: 'public/js/'},
  {src: 'node_modules/js-sha256/src/sha256.js', dest: 'public/js'},
  {src: 'client/app.js', dest: 'public/js/'}
];
gulp.task('copyFile', function(){
  files.forEach(function(f){
    gulp.src(f.src)
    .pipe(gulp.dest(f.dest));
  });
});

gulp.task('watch', function(){
  gulp.watch(['client/app.js'], ['copyFile']);
});

gulp.task('default', ['run', 'copyFile', 'watch']);

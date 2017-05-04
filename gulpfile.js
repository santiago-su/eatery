var gulp = require('gulp');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var nodemon = require('gulp-nodemon');
var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';

var viewFiles = 'frontend/js/**/*.html';


var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename('app.templates.js'))
      .pipe(gulp.dest('./frontend/js/config/'));
});


gulp.task('default', ['views'], function() {

  gulp.watch(viewFiles, ['views']);

  const Webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('./webpack.config.js');

  if (!isProduction) {
    let compiler = Webpack(webpackConfig);

    let bundler = new WebpackDevServer(compiler, {
      publicPath: '/assets/',
      hot: true,
      quiet: false,
      noInfo: true,
      stats: {
        colors: true
      }
    });

    bundler.listen(3001, 'localhost', function () {
      console.log(':)');
    });
  };

  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'backend/server'),
    ignore: [],
    watch: !isProduction ? ['backend/*'] : false,
    ext: 'js'
  }).on('restart', function() {
    console.log('Backend restarted!');
  });
});

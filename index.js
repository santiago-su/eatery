const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const nodemon = require('nodemon');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

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

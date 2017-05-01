const path = require('path');
const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);
const publicPath = path.resolve(__dirname, '..', 'public');

if (process.env.NODE_ENV !== 'production') {

  const Webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack.config');

  const compiler = Webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    publicPath: '/assets/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });
  server.listen(8080, function() {
    console.log(`Listening at http://localhost:${port}`)
  });
}

app.use(express.static(publicPath));
app.get('/*', function (req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port);
console.log(`Listening at http://localhost:${port}`);

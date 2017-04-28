const express = require('express');
const app = express();
const path = require('path');
const host = process.env.APP_HOST || 'localhost';
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 8080 : 3000;
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const publicPath = path.resolve(__dirname, '..', 'public');

// Proxy to webpack-dev-server
app.all(['/assets/*', '*.hot-update.json'], function (req, res) {
  proxy.web(req, res, {
    target: `http://${host}:3001`
  });
});

app.use(express.static(publicPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});


proxy.on('error', function(e) {
  console.log('Proxy error', e);
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

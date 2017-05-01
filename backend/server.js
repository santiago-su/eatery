const express = require('express');
const app = express();
const path = require('path');
const host = process.env.APP_HOST || 'localhost';
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 8080 : 3000;
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const publicPath = path.resolve(__dirname, '..', 'public');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/test';

// Set up connection to mongo default test database
mongoose.connect(mongoDB);
const db = mongoose.connection;

// To handle clients API requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!isProduction) {
  // Proxy to webpack-dev-server
  app.all(['/assets/*', '*.hot-update.json'], function (req, res) {
    proxy.web(req, res, {
      target: `http://${host}:3001`
    });
  });
}

app.use(express.static(publicPath));

app.get('/*', function(req, res) {
  res.sendFile(path.join(publicPath, 'index.html'));
});


proxy.on('error', function(e) {
  console.log('Proxy error', e);
});

// Handle db connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

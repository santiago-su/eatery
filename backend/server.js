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
const morgan = require('morgan');
const router = express.Router();
const restaurant = require('./routes/restaurant');

// Set up connection to mongo default test database
mongoose.connect(mongoDB);
const db = mongoose.connection;

// To log to console
app.use(morgan('default'));

// To handle clients API requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

// Setup '/api' as starting router
app.use('/api', router);

if (!isProduction) {
  // Proxy to webpack-dev-server
  app.all(['/assets/*', '*.hot-update.json'], function (req, res) {
    proxy.web(req, res, {
      target: `http://${host}:3001`
    });
  });

  proxy.on('error', function(e) {
    console.log('Proxy error', e);
  });
}

app.use(express.static(publicPath));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'frontend','index.html'));
});

// ROUTES /////////////////////////////////////////////////////////////////////

router.route('/restaurant')
  .get(restaurant.getRestaurants)
  .post(restaurant.postRestaurant);

// Handle db connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

module.exports = app;

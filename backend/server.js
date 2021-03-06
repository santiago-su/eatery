require('dotenv').config();
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
const morgan = require('morgan');
const router = express.Router();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


require('./config/db');

const restaurant = require('./routes/restaurant');
const user = require('./routes/user');


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
  app.all(['/assets/*', '*.hot-update.json'], (req, res) => {
    proxy.web(req, res, {
      target: `http://${host}:3001`
    });
  });

  proxy.on('error', (e) => {
    console.log('Proxy error', e);
  });
}

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend','index.html'));
});

// ROUTES /////////////////////////////////////////////////////////////////////

router.route('/restaurants')
  .get(restaurant.getRestaurants)
  .post(restaurant.postRestaurants);

router.get('/restaurant', restaurant.getRestaurant);
router.post('/restaurant/review',jwt({ secret: process.env.JWT_SECRET }), restaurant.postRestaurantReview);

router.post('/register', user.signUp);
router.post('/login', user.login);
router.get('/user',jwt({ secret: process.env.JWT_SECRET }), user.user);

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

module.exports = app;

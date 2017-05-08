/*eslint-disable no-unused-vars*/
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
const https = require('https');
/*eslint-enable no-unused-vars*/

/*
 * GET /restaurant route
 */
function getRestaurants(req, res) {
  let query = Restaurant.find({});
  query.exec((err, restaurants) => {
    if(err) res.send(err);
    res.json(restaurants);
  });
}

/*
 * POST /restaurant
 */
function postRestaurants(req, res) {
  let googleUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat},${req.body.long}&radius=500&type=restaurant&key=${process.env.GOOGLE_API_KEY}`;
  https.get(googleUrl, (response) => {
    let body = '';
    response.on('data', (chunk) => {
      body += chunk;
    });
    response.on('end', () => {
      let response = JSON.parse(body);
      let places = response.results;
      Restaurant.insertMany(places).then((restaurants) => {
        res.status(200);
        res.json({ message: 'Success!', restaurants });
      }).catch((error) => {
        res.status(404);
        res.send({'error': error});
      });
    });
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
    res.status(404);
    res.send({'error': e});
  });
}

/*
 * POST /restaurant/review
 */

function postRestaurantReview(req, res) {
  let restaurantId = req.body.id;
  let user = req.user.email;
  let description = req.body.restaurant.review;
  Restaurant.findOne({ id: restaurantId })
    .then((restaurant) => {
      let reviewSchema = {
        author: user,
        description: description,
        score: 5
      };
      restaurant.reviews.push(reviewSchema);
      restaurant.save();
      return restaurant;
    }).then((restaurant) => {
      res.json({ message: 'Success!', restaurant });
    }).catch((error) => {
      res.send(error);
    });

}

/*
 * GET /restaurant/:id
 */
function getRestaurant(req, res) {
  let query = Restaurant.findOne({ id: req.query.id });
  query.exec((err, restaurant) => {
    if (err) res.send(err);
    res.status(200);
    res.json(restaurant);
  });
}


module.exports = { getRestaurants, postRestaurants, getRestaurant, postRestaurantReview };

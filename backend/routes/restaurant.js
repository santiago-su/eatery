const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');

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
function postRestaurant(req, res) {
  console.log('request body', req.body);
  let restaurants = req.body
  Restaurant.insertMany(restaurants)
    .then((restaurants) => {
      res.json({ message: 'Success!', restaurants })
    }).catch((error) => {
      res.send(error)
    })

}

module.exports = { getRestaurants, postRestaurant };

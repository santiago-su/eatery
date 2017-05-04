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
function postRestaurants(req, res) {
  let restaurants = req.body;
  Restaurant.insertMany(restaurants)
    .then((restaurants) => {
      res.json({ message: 'Success!', restaurants });
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
    res.status(200)
    res.json(restaurant);
  });
}


module.exports = { getRestaurants, postRestaurants, getRestaurant };

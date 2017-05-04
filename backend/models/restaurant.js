const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RestaurantSchema = new Schema({
  place_id: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  vicinity: { type: String, required: true, unique: true },
  reviews: [{
    score: Number,
    author: String,
    description: String
  }]
});

module.exports = mongoose.model('restaurant', RestaurantSchema);

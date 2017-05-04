const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = bcrypt.genSaltSync(saltRounds);
  this.hash = bcrypt.hashSync(password, this.salt);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.hash);
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, 'secret');
};

module.exports = mongoose.model('User', userSchema);

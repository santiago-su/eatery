const mongoose = require('mongoose');
let User = mongoose.model('User');

/*
 * POST signup /register
 */
function signUp(req, res) {
  let user = new User({ email: req.body.user.email });
  user.setPassword(req.body.user.password);

  user.save(() => {
    let token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      'email' : user.email,
      'token' : token
    });
  });
}

/*
 * POST login /login
 */
function login(req, res) {

  if (!req.body.user || !req.body.user.email || !req.body.user.password) {
    res.status(403);
    res.json({ 'error' : {'message' : 'No credentials'} });
  } else {
    User.findOne({ email: req.body.user.email }).then((user) => {
      let token;
      if (user && user.validPassword(req.body.user.password)) {
        token = user.generateJwt();
        res.status(200);
        res.json({
          'email' : user.email,
          'token' : token
        });
      }
    }).catch((err) => {
      res.status(404);
      res.json({ 'error': err });
    });
  }
}

/*
 * GET user /user
 */

function user(req, res) {
  User.findOne({ email: req.user.email }).then((user) => {
    let token = user.generateJwt();
    res.status(200);
    res.json({
      'email' : user.email,
      'token' : token
    });
  }).catch((err) => {
    res.status(403);
    res.json({ 'error': `${err} Not authenticated` });
  });
}

module.exports = { signUp, login, user };

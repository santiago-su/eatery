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

  if (!req.body.user.email || !req.body.user.password) {
    res.status(403);
    res.json({ 'errors' : {'message' : 'No credentials'} });
  } else {
    let query = User.findOne({ email: req.body.user.email });
    query.exec(function(err, user) {
      let token;
      if (err) res.json(404);
      if (!user) { res.json(404) }
      if (user.validPassword(req.body.user.password)) {
        token = user.generateJwt();
        res.status(200);
        res.json({
          'email' : user.email,
          'token' : token
        });
      }
    })
  }
}

module.exports = { signUp, login };

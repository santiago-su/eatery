/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../backend/models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const should = chai.should();
const expect = chai.expect;
const chaiJWT = require('chai-jwt');

chai.use(chaiHttp);
chai.use(chaiJWT);

let createUser = (data) => {
  let user = new User({
    email: data.email,
    password: data.password
  });
  user.save();
  return user;
};

let userPayload = {
  user: {
    email: 'example@example.com',
    password: 'secretsecret'
  }
};


describe('User', () => {

  afterEach((done) => {
    User.remove({}, () => {
      done();
    });
  });


  /*
  * POST register
  */

  describe('/POST user signup', () => {

    it('it should create a user in db and return jwt token', (done) => {
      let user = userPayload;
      chai.request(server)
        .post('/api/register')
        .send(user)
        .end((err, res) => {
          User.findOne({email: user.user.email}, function(err, user) {
            expect(res.body.email).to.eql(user.email);
          });

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');

          // Token should be valid and signed with secret
          expect(res.body.token).to.be.a.jwt;
          expect(res.body.token).to.be.signedWith('secret');
          expect(res.body.token).to.be.a.jwt.and.include.property('email');

          done();
        });
    });


  });


  /*
  * POST login
  */

  describe('/POST user login', () => {

    it('it should find user in db and return jwt token', (done) => {

      createUser({
        email: 'example@example.com',
        password: 'secretsecret'
      });

      let user = userPayload;

      chai.request(server)
        .post('/api/login')
        .send(userPayload)
        .end((err, res) => {
          User.findOne({email: user.user.email}, function(err, user) {
            expect(res.body.email).to.eql(user.email);
          });

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');

          // Token should be valid and signed with secret
          expect(res.body.token).to.be.a.jwt;
          expect(res.body.token).to.be.signedWith('secret');
          expect(res.body.token).to.be.a.jwt.and.include.property('email');

          done();
        });
    });


  });
});

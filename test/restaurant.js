/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

/*eslint-disable no-unused-vars*/
const mongoose = require('mongoose');
const User = require('../backend/models/user');
const Restaurant = require('../backend/models/restaurant');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const should = chai.should();
const chaiJWT = require('chai-jwt');
/*eslint-enable no-unused-vars*/

chai.use(chaiHttp);
chai.use(chaiJWT);

describe('Restaurants', () => {

  const restaurants = [{
    place_id: 'secret',
    id: 'secret',
    name: 'secret',
    vicinity: 'secret'
  }];

  afterEach((done) => {
    Restaurant.remove({}, () => {
      done();
    });
  });


  /*
  * POST route
  */

  describe('/POST restaurant', () => {

    it('it should POST an array of restaurants', (done) => {
      chai.request(server)
        .post('/api/restaurants')
        .send(restaurants)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Success!');
          res.body.restaurants.forEach(function(r) {
            r.should.have.property('place_id');
            r.should.have.property('id');
            r.should.have.property('name');
            r.should.have.property('vicinity');
          });

          done();
        });
    });


  });


  /*
  * GET route
  */

  describe('/GET restaurants', () => {

    it('it should GET all restaurants', (done) => {
      chai.request(server)
        .get('/api/restaurants')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();

        });
    });


  });


  /*
  * GET route
  */
  describe('/GET restaurant/:id', () => {

    it('it should find the restaurant with the specified id and return it', (done) => {
      Restaurant.insertMany(restaurants);
      chai.request(server)
        .get('/api/restaurant')
        .query({ id: restaurants[0].id })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.place_id.should.be.eql(restaurants[0].place_id);
          res.body.id.should.be.eql(restaurants[0].id);
          res.body.name.should.be.eql(restaurants[0].name);
          res.body.vicinity.should.be.eql(restaurants[0].vicinity);

          done();
        });
    });


  });


  /*
  * POST route
  */
  describe('/POST restaurant/review', () => {

    // it should auth a user to be able to POST to this route
    let user = new User({
      email: 'example',
      password: 'secret'
    });
    user.save();
    let token = user.generateJwt();

    it('it should post a review from a restaurant', (done) => {
      Restaurant.insertMany(restaurants);
      chai.request(server)
        .post('/api/restaurant/review')
        .set('Authorization', `Bearer ${token}`)
        .send({ restaurant: { review: 'amazing restaurant' }, id: restaurants[0].id })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Success!');
          res.body.restaurant.reviews.length.should.not.be.eql(0);
          res.body.restaurant.reviews[0].description.should.be.eql('amazing restaurant');
          res.body.restaurant.reviews[0].author.should.be.eql(user.email);
          done();
        });
    });


  });

});

/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Restaurant = require('../backend/models/restaurant');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const should = chai.should();

chai.use(chaiHttp);


describe('Restaurants', () => {

  const restaurants = [{
    place_id: 'secret',
    id: 'secret',
    name: 'secret',
    vicinity: 'secret'
  }];

  afterEach((done) => {
    Restaurant.remove({}, (err) => {
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
          res.body.rshould.be.a('object');
          res.body.restaurant.place_id.should.be.eql(restaurants[0].place_id);
          res.body.restaurant.id.should.be.eql(restaurants[0].id);
          res.body.restaurant.name.should.be.eql(restaurants[0].name);
          res.body.restaurant.vicinity.should.be.eql(restaurants[0].vicinity);

          done();
        });
    });


  });

});

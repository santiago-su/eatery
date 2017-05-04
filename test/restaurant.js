process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Restaurant = require('../backend/models/restaurant');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const should = chai.should();

chai.use(chaiHttp);


describe('Restaurants', () => {

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
      let restaurants = [{
        place_id: 'secret',
        id: 'secret',
        name: 'secret',
        vicinity: 'secret'
      }]
      chai.request(server)
        .post('/api/restaurant')
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

});

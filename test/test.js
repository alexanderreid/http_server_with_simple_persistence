'use strict';

require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);

describe('simple persistence', function() {

  it('should add a new lure', function (done) {
    chai.request('localhost:3000')
      .post('/tackle/lures')
      .send({title: 'test title'})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('test title added to your tackle.');
        done();
      });
  });

  it('should return an array of lure types', function (done) {
    chai.request('localhost:3000')
      .get('/tackle/lures')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});

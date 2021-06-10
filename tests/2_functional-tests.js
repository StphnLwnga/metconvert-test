const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Valid GET Request', function(done) {
    chai.request(server)
    .get('/api/convert')
    .query({input: '10L'})
    .end((err, res) => {
      assert.equal(res.body.initNum, 10);
      assert.equal(res.body.initUnit, 'L');
      assert.equal(res.body.returnNum, 2.64172);
      assert.equal(res.body.returnUnit, 'gal');
      assert.equal(res.body.string, '10 litres converts to 2.64172 gallons');
      done();
    });
  });

  test('Invalid Unit GET Request', function(done) {
    chai.request(server)
    .get('/api/convert')
    .query({input: '32g'})
    .end((err, res) => {
      assert.equal(res.text, 'invalid unit');
      done();
    });
  });

  test('Invalid Number GET Request', function(done) {
    chai.request(server)
    .get('/api/convert')
    .query({input: '3/7.2/4kg'})
    .end((err, res) => {
      assert.equal(res.text, 'invalid number');
      done();
    });
  });

  test('Invalid Units + Number GET Request', function(done) {
    chai.request(server)
    .get('/api/convert')
    .query({input: '3/7.2/4kilomegagram'})
    .end((err, res) => {
      assert.equal(res.text, 'invalid number and unit');
      done();
    });
  });

  test('No Number GET Request', function(done) {
    chai.request(server)
    .get('/api/convert')
    .query({input: 'kg'})
    .end((err, res) => {
      assert.equal(res.body.initNum, 1);
      assert.equal(res.body.initUnit, 'kg');
      assert.equal(res.body.returnNum, 2.20462);
      assert.equal(res.body.returnUnit, 'lbs');
      assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
      done();
    });
  });

});
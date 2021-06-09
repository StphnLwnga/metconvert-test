
const Browser = require('zombie');
const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests with chai-http', function () {
	suite('Api conversions', () => {
		test('GET / load index page', done => {
			chai
				.request(server)
				.get('/')
				.end((err, res) => {
					assert.equal(res.status, 200);
					done();
				});
		});
		test('Convert input with valid number and valid unit 👉🏾️ 10L', done => {
			chai
				.request(server)
				.get('/api/convert')
				.query({ input: '10L' })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.include(res.headers['content-type'], 'application/json');
					assert.notProperty(res.body, 'err')
					assert.equal(res.body.initNum, 10);
					assert.equal(res.body.initUnit, 'L')
					assert.equal(res.body.returnUnitStr, 'gallons');
					assert.approximately(parseFloat(res.body.returnNum), 2.64172, 0.1);
					assert.property(res.body, 'string');
					done();
				});
		});
		test('Convert input with invalid unit 👉🏾️ 32g', done => {
			chai
				.request(server)
				.get('/api/convert')
				.query({ input: '32g' })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.include(res.headers['content-type'], 'application/json');
					assert.property(res.body, 'err');
					['initNum', 'returnNum', 'initUnit', 'returnUnit', 'string'].every(prop => assert.notProperty(res.body, prop));
					assert.equal(res.body.msg, 'invalid unit');
					done();
				});
		});
		test('Convert input with invalid number 👉🏾️ 3/7.2/4kg', done => {
			chai
				.request(server)
				.get('/api/convert')
				.query({ input: '3/7.2/4kg' })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.include(res.headers['content-type'], 'application/json');
					assert.property(res.body, 'err');
					['initNum', 'returnNum', 'initUnit', 'returnUnit', 'string'].every(prop => assert.notProperty(res.body, prop));
					assert.equal(res.body.msg, 'invalid number');
					done();
				});
		});
		test('Convert input with invalid number & invalid unit 👉🏾️ 3/7.2/4kilomegagram', done => {
			chai
				.request(server)
				.get('/api/convert')
				.query({ input: '3/7.2/4kilomegagram' })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.include(res.headers['content-type'], 'application/json');
					assert.property(res.body, 'err');
					['initNum', 'returnNum', 'initUnit', 'returnUnit', 'string'].every(prop => assert.notProperty(res.body, prop));
					assert.equal(res.body.msg, 'invalid number and unit');
					done();
				});
		});
		test('Convert valid units without number 👉🏾️ kg', done => {
			chai
				.request(server)
				.get('/api/convert')
				.query({ input: 'kg' })
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.include(res.headers['content-type'], 'application/json');
					assert.notProperty(res.body, 'err');
					assert.equal(res.body.initNum, 1);
					assert.equal(res.body.initUnit, 'kg')
					assert.equal(res.body.returnUnitStr, 'pounds');
					assert.approximately(parseFloat(res.body.returnNum), 2.20462, 0.1);
					assert.property(res.body, 'string');
					done();
				});
		});
	});
});

// Browser.site = `http://localhost:3000`;
// Browser.site = "https://metconvert-test.stlwanga.repl.co";

// suite('Functional tests with Zombie.js', function() {
// 	const browser = new Browser();

// 	suiteSetup(function(done) {
//     return browser.visit('/', done);
//   });

// 	suite('Functional conversion form', () => {
// 		test('Form that accepts input for conversion is loaded', done => {
// 			browser.assert.element('form#convertForm');
// 			done();
// 		});
// 		test('Form accepts input and displays a result', done => {
// 			browser.fill('input', '10L')
// 				.then(() => browser.pressButton('submit', () => {
// 					browser.assert.success();
// 					browser.assert.elements('p#result', 1);
// 					browser.assert.element('code#json', 1);
// 					done();
// 				}))
// 		});
// 	});
// });

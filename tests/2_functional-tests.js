
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
					assert.fail('Test successfully loading index page')
					done();
				});
		});
	})
});

// Browser.site = 'https://sincere-cone.gomix.me'; // Your URL here
Browser.site = `http://localhost:3000`;

suite('Functional tests with Zombie.js', function() {
	const browser = new Browser();

	suiteSetup(function(done) {
    return browser.visit('/', done);
  });

	suite('Functional conversion form', () => {
		test('Form that accepts input for conversion is loaded', done => {
			browser.assert.element('form#convertForm');
			done();
		});
		// test('Form accepts input and displays a result', done => {
		// 	browser.fill("input", "10L").pressButton("submit", () => {
		// 		browser.assert.success();
		// 		// browser.assert.elements('p#result', 1);
		// 		// browser.assert.element('code#json', 1);
		// 		done();
		// 	})
		// })
	});
});

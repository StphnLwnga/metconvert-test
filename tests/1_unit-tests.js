const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Test ConvertHandler instance', function(done) {
		test('convertHandler is an instance of ConvertHandler controller', done => {
			assert.instanceOf(convertHandler, ConvertHandler);
			done()
		})
	})

	suite('Check for valid & invalid numerical input in the get number method', function () {
		test('Accept a whole number input as valid', done => {
			const input = '32';
			assert.isTrue(convertHandler.getNum(input).isNum, 'The method accepts a whole number and returns a numerical value');
			assert.equal(convertHandler.getNum(input).value, 32);
			done();
		});
		test('Accept a decimal number input as valid', done => {
			const input = '5.5';
			assert.isTrue(convertHandler.getNum(input).isNum, 'The method accepts a decimal number and returns a numerical value');
			assert.equal(convertHandler.getNum(input).value, 5.5);
			done();
		});
		test('Accept a fractional input as valid', done => {
			const input = '6/3';
			assert.isTrue(convertHandler.getNum(input).isNum, 'The method accepts a fraction and returns a numerical value');
			assert.equal(convertHandler.getNum(input).value, 2);
			done();
		});
		test('Accept a fractional input with decimal as valid', done => {
			const input = '100/2.5';
			assert.isTrue(convertHandler.getNum(input).isNum, 'The method accepts a fractional input with a decimal and returns a numerical value');
			assert.equal(convertHandler.getNum(input).value, 40);
			done();
		});
		test('Return an error on a double fractional input', done => {
			const input = '1000/5/10';
			assert.isFalse(convertHandler.getNum(input).isNum, 'Error on double fractional input');
			assert.isUndefined(convertHandler.getNum(input).value);
			done();
		});
		test('Default to 1 when no numerical input is provided', done => {
			const input = 'lbs';
			assert.isTrue(convertHandler.getNum(input).isNum, 'Empty input return 1');
			assert.equal(convertHandler.getNum(input).value, 1, 'Passing in valid units without numbers defaults to 1 of that unit');
			done();
		});
	});

	suite('Check for valid & invalid unit input in the get units method', function () {
		test('Read each valid input correctly', done => {
			const input = ['gal', 'kg', 'km', 'l', 'lbs', 'mi',];
			const validUnits = Object.keys(convertHandler.validUnits());
			assert.isArray(validUnits, 'An array with valid units as elements');
			assert.isTrue(input.every(u => validUnits.includes(u)), 'Checks whether each element in the input is a valid unit')
			done();
		});
		test('Return an error for an invalid unit', done => {
			const input = 'xxx';
			const validUnits = Object.keys(convertHandler.validUnits());
			assert.isFalse(validUnits.includes(input), 'Invalid unit is absent in array of valid units');
			done();
		});
	});

	suite('Test correct unit conversion with the converted units method', function () {
		test('Return the correct return unit for each valid input', done => {
			const input = ['gal', 'kg', 'km', 'l', 'lbs', 'mi',];
			const converted = ['l', 'lbs', 'mi', 'km', 'gal', 'kg'];
			input.every((unit, i) => assert.equal(convertHandler.getReturnUnit(unit), converted[i]));
			done();
		});
		test('Return an error for an invalid unit', done => {
			const input = 'xxx';
			assert.match(convertHandler.getReturnUnit(input), /^invalid unit$/);
			done();
		});
	});

	suite('Test spelled-out string for a valid input', function () {
		test('Return correctly spelled-out strings for valid unit names', done => {
			const input = ['gal', 'kg', 'km', 'l', 'lbs', 'mi',];
			const spelledOut = ['gallons', 'kilograms', 'kilometres', 'litres', 'pounds', 'miles',];
			input.every((unit, i) => assert.equal(convertHandler.spellOutUnit(unit), spelledOut[i]));
			done();
		});
		test('Return an error for an invalid unit', done => {
			const input = 'otherUnit';
			assert.equal(convertHandler.spellOutUnit(input), 'invalid unit');
			done();
		});
	});
});
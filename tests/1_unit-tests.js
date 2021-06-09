const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Test ConvertHandler instance', function (done) {
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

	suite('Check for valid number & valid unit in the input', function () {
		test('Read each valid input correctly', done => {
			const input = ['gal', 'kg', 'km', 'L', 'lbs', 'mi',];
			const validUnits = Object.keys(convertHandler.validUnits());
			assert.isArray(validUnits, 'An array with valid units as elements');
			assert.isTrue(input.every(u => validUnits.includes(u)), 'Checks whether each element in the input is a valid unit')
			done();
		});
		test('gal to L irrespective of case', done => {
			assert.equal(convertHandler.getReturnUnit('gal'), 'L');
			assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('gal'.toUpperCase()).value), 'L');
			done();
		});
		test('lbs to kg irrespective of case', done => {
			assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
			assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('lbs'.toUpperCase()).value), 'kg');
			done();
		});
		test('mi to km irrespective of case', done => {
			assert.equal(convertHandler.getReturnUnit('mi'), 'km');
			assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('mi'.toUpperCase()).value), 'km');
			done();
		});
		test('L to gal irrespective of case', done => {
			assert.equal(convertHandler.getReturnUnit('L'), 'gal');
			assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('L'.toLowerCase()).value), 'gal');
			done();
		});
		test('kg to lbs irrespective of case', done => {
			assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
			assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('kg'.toUpperCase()).value), 'lbs');
			done();
		});
		test('km to mi irrespective of case', done => {
			assert.equal(convertHandler.getReturnUnit('km'), 'mi');
			assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('km'.toUpperCase()).value), 'mi');
			done();
		});
	});

	suite('Test correct unit conversion with the converted units method', function () {
		test('Return the correct return unit for each valid input', done => {
			const input = ['gal', 'kg', 'km', 'L', 'lbs', 'mi',];
			const converted = ['L', 'lbs', 'mi', 'km', 'gal', 'kg'];
			input.every((unit, i) => assert.equal(convertHandler.getReturnUnit(unit), converted[i]));
			done();
		});
		test('Return "invalid unit" if input contains invalid unit', done => {
			const input = '32g';
			assert.isFalse(convertHandler.getUnit(input).isUnit);
			assert.equal(convertHandler.getReturnUnit(input), 'invalid unit');
			done();
		});
		test('Return "invalid number" if input contains invalid number', done => {
			const input = '3/7.2/4kg';
			const initNum = convertHandler.getNum(input).value;
			const initUnit = convertHandler.getUnit(input).value;
			assert.isTrue(convertHandler.getUnit(input).isUnit);
			assert.equal(convertHandler.convert(initNum, initUnit), 'invalid number');
			done();
		});
		test('Return "invalid number and unit" if input contains both an invalid number and unit', done => {
			const input = '3/7.2/4kilomegagram';
			const initNum = convertHandler.getNum(input).value;
			const initUnit = 'kilomegagram';
			assert.isFalse(convertHandler.getUnit(input).isUnit);
			assert.equal(convertHandler.getString(input).msg, 'invalid number and unit');
			done();
		});
	});

	suite('Test spelled-out string for a valid input', function () {
		test('Return correctly spelled-out strings for valid unit names', done => {
			const input = ['gal', 'kg', 'km', 'L', 'lbs', 'mi',];
			const spelledOut = ['gallons', 'kilograms', 'kilometres', 'liters', 'pounds', 'miles',];
			input.every((unit, i) => assert.equal(convertHandler.spellOutUnit(unit), spelledOut[i]));
			done();
		});
	});

	suite('Return value consist of the "initNum", "initUnit", "returnNum", "returnUnit", and "string"', done => {
		test('Valid input returns object with "initNum", "initUnit", "returnNum", "returnUnit", and "string" as keys', done => {
			const input = '10L';
			// assert.equal()
			done();
		});
	})
});
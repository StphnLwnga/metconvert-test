const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('Whole Number Input', function(done){
    let inp = '50L'
    assert.equal(convertHandler.getNum(inp), 50);
    done();
  });

  test('Decimal Number Input', function(done){
    let inp = '5.10km'
    assert.equal(convertHandler.getNum(inp), 5.10);
    done();
  });

  test('Fractional Number Input', function(done){
    let inp = '2/8gal'
    assert.equal(convertHandler.getNum(inp), 0.25);
    done();
  });

  test('Fractional + decimal Number Input', function(done){
    let inp = '2.5/10mi'
    assert.equal(convertHandler.getNum(inp), 0.25);
    done();
  });

  test('Handling Double Fraction Error Input', function(done){
    let inp = '25/10/2mi'
    assert.equal(convertHandler.getNum(inp), 'invalid number');
    done();
  });

  test('Empty Number Input', function(done){
    let inp = 'lbs'
    assert.equal(convertHandler.getNum(inp), 1);
    done();
  });

  test('correct Unit Input', function(done){
    const units = [ 'kg', 'gal', 'mi', 'km', 'lbs', 'L' ];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit('25' + unit), unit);
    });
    done();
  });

  test('Ivalid Unit Input', function(done){
    const units = [ 'Bb', 'Wal', 'mo', 'k', 'ail', 'hi' ];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit('12.5' + unit), 'invalid unit');
    });
    done();
  });

  test('correct Unit Conversion', function(done){
    const units = [ ['kg', 'lbs'], ['gal', 'L'], ['mi', 'km'], ['km', 'mi'], ['lbs', 'kg'], ['L', 'gal'] ];

    units.forEach(unit => {
      assert.equal(convertHandler.getReturnUnit(unit[0]), unit[1]);
    });
    done();
  });

  test('correct Unit Spelled', function(done){
    const units = [ ['kg', 'kilograms'], ['gal', 'gallons'], ['mi', 'miles'], ['km', 'kilometers'], ['lbs', 'pounds'], ['L', 'litres'] ];

    units.forEach(unit => {
      assert.equal(convertHandler.spellOutUnit(unit[0]), unit[1]);
    });
    done();
  });

  test('Correct gal to L Conversion', function(done){
    let unit = 'gal';
    let num = '2';
    assert.equal(convertHandler.convert(num, unit), 7.57082);
    done();
  });

  test('Correct L to gal Conversion', function(done){
    let unit = 'L';
    let num = '9.3';
    assert.equal(convertHandler.convert(num, unit), 2.45680);
    done();
  });

  test('Correct mi to Km Conversion', function(done){
    let unit = 'mi';
    let num = '12';
    assert.equal(convertHandler.convert(num, unit), 19.31208);
    done();
  });

  test('Correct Km to mi Conversion', function(done){
    let unit = 'km';
    let num = '8';
    assert.equal(convertHandler.convert(num, unit), 4.97098);
    done();
  });

  test('Correct lbs to Kg Conversion', function(done){
    let unit = 'lbs';
    let num = '3';
    assert.equal(convertHandler.convert(num, unit), 1.36078);
    done();
  });

  test('Correct Kg to lbs Conversion', function(done){
    let unit = 'kg';
    let num = '5';
    assert.equal(convertHandler.convert(num, unit), 11.02312);
    done();
  });

});
function ConvertHandler() {
  this.validUnits = function() {
    return {
      'gal': 'gallons',
      'kg': 'kilograms',
      'km': 'kilometers',
      'L': 'liters',
      'lbs': 'pounds',
      'mi': 'miles',
    }
  }

  this.getNum = function (input) {
    if (input.match(/\d/g) === null && Object.keys(this.validUnits()).includes(input.match(/\w/gi).join(''))) return 1

    if (input.match(/\d*\W{2,}\d/g) !== null) return 'invalid number'

    // If not fraction parse float from input
    if (!input.includes('/')) {
      let num = parseFloat(input)
      if (!isNaN(num)) {
        return num
      } else {
        return 'invalid number';
      }
    };

    if (input.includes('.') && [...input].filter(charac => charac === '.').length > 1) return 'invalid number'

    // If fraction in input strip out unit
    if (input.includes('/')) {
      let found = input.match(/\d|\W/g);
      if (found === null && found.filter(charac => charac.match(/\W/g)).length === 0) return 1;

      if (
        found.filter(charac => charac === '/').length > 1
        || found.filter(charac => charac === '.').length > 1
        || found.join('').match(/\d/g) === null
      ) return 'invalid number';

      const execOperation = opStr => { return Function(`return ${opStr}`)() }
      return execOperation(found.join(''))
    }
  };

  this.getUnit = function (input) {
    const validUnits = this.validUnits();
    let unit = input.match(/[a-zA-Z]/g).join('');
    unit = unit === 'l' || unit === 'L' ? unit.toUpperCase() : unit.toLowerCase();
    // console.log(unit)
    let result;
    result = !Object.keys(validUnits).includes(unit) ? { isUnit: false } : { isUnit: true, value: unit, }
    // console.log(result)
    return result
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case ('gal'):
        return 'L';
      case ('mi'):
        return 'km';
      case ('lbs'):
        return 'kg';
      case ('kg'):
        return 'lbs';
      case ('km'):
        return 'mi';
      case ( 'L'):
        return 'gal';
      default:
        return 'invalid unit'
    }
  };

  this.spellOutUnit = function (unit) {
    const validUnits = this.validUnits();
    return validUnits[unit] || 'invalid unit';
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const lToGal = 1 / galToL;
    const kgToLbs = 1 / lbsToKg;
    const kmToMi = 1 / miToKm;

    // console.log(initNum)

    if (isNaN(initNum)) return 'invalid number';

    if (isNaN(initNum) && !Object.keys(this.validUnits()).includes(initUnit)) return 'invalid number and unit';

    switch (initUnit) {
      case ('gal'):
        return (initNum * galToL) === 1 ? 1 : (initNum * galToL).toFixed(5);
      case ('mi'):
        return (initNum * miToKm) === 1 ? 1 : (initNum * miToKm).toFixed(5);
      case ('lbs'):
        return (initNum * lbsToKg) === 1 ? 1 : (initNum * lbsToKg).toFixed(5);
      case ('kg'):
        return (initNum * kgToLbs) === 1 ? 1 : (initNum * kgToLbs).toFixed(5);
      case ('km'):
        return (initNum * kmToMi) === 1 ? 1 : (initNum * kmToMi).toFixed(5);
      case ('L'):
        return (initNum * lToGal) === 1 ? 1 : (initNum * lToGal).toFixed(5);
      default:
        return 'invalid unit'
    }
  };

  this.getString = function (input) {
    const initUnit = this.getUnit(input).value || 'invalid unit';
    const initUnitString = this.spellOutUnit(initUnit);
    
    const returnUnit = this.getReturnUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    const initNum = this.getNum(input);
    const returnNum = !isNaN(initNum) ? this.convert(initNum, initUnit) : 'invalid number';

    let result;

    switch(true) {
      case(returnNum === 'invalid number' && returnUnit === 'invalid unit'):
        result = {err: true, msg:`invalid number and unit`};
        break;
      case(returnNum === 'invalid number'):
        result = {err: true, msg: returnNum};
        break;
      case(returnUnit === 'invalid unit'):
        result = {err: true, msg: returnUnit};
        break;
      default:
        result = {initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`};
        break;
    }
    console.log(result)
    return result
  };
}

module.exports = ConvertHandler;

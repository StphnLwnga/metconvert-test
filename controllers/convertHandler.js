function ConvertHandler() {
  this.validUnits = function() {
    return {
      'gal': 'gallons',
      'kg': 'kilograms',
      'km': 'kilometers',
      'l': 'liters',
      'lbs': 'pounds',
      'mi': 'miles',
    }
  }

  this.getNum = function (input) {
    if (input.match(/\d/g) === null && Object.keys(this.validUnits()).includes(input.match(/\w/gi).join(''))) return {
      isNum: true,
      value: 1,
    }

    if (input.match(/\d*\W{2,}\d/g) !== null) return { isNum: false }

    // If not fraction parse float from input
    if (!input.includes('/')) {
      let num = parseFloat(input)
      if (!isNaN(num)) {
        return ({
          isNum: true,
          value: num,
        })
      } else {
        return { isNum: false }
      }
    };

    if (input.includes('.') && [...input].filter(charac => charac === '.').length > 1) return { isNum: false }

    // If fraction in input strip out unit
    if (input.includes('/')) {
      let found = input.match(/\d|\W/g);
      if (found === null && found.filter(charac => charac.match(/\W/g)).length === 0) return { isNum: true, value: 1 };

      if (
        found.filter(charac => charac === '/').length > 1
        || found.filter(charac => charac === '.').length > 1
        || found.join('').match(/\d/g) === null
      ) return { isNum: false };

      const execOperation = opStr => { return Function(`return ${opStr}`)() }
      return { isNum: true, value: execOperation(found.join('')), }
    }
  };

  this.getUnit = function (input) {
    const validUnits = this.validUnits();
    let unit = input.match(/[a-z]/gi).join('').toLowerCase();
    if (!Object.keys(validUnits).includes(unit)) return ({ isUnit: false });
    return {
      isUnit: true,
      value: unit,
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case ('gal'):
        return 'l';
      case ('mi'):
        return 'km';
      case ('lbs'):
        return 'kg';
      case ('kg'):
        return 'lbs';
      case ('km'):
        return 'mi';
      case ('l'):
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
      case ('l'):
        return (initNum * lToGal) === 1 ? 1 : (initNum * lToGal).toFixed(5);
      default:
        return 'invalid unit'
    }
  };

  this.getString = function (input) {
    const initUnit = this.getUnit(input).value || 'invalid unit';
    const fullInitUnit = this.spellOutUnit(initUnit);
    
    const returnUnit = this.getReturnUnit(initUnit);
    const fullReturnunit = this.spellOutUnit(returnUnit);

    const initNum = this.getNum(input);
    const returnNum = initNum.isNum ? this.convert(initNum.value, initUnit) : 'invalid number';

    switch(true) {
      case(returnNum === 'invalid number' && returnUnit === 'invalid unit'):
        return {err: true, msg:`${returnNum} and ${returnUnit}`};
      case(returnNum === 'invalid number'):
        return {err: true, msg: returnNum};
      case(returnUnit === 'invalid unit'):
        return {err: true, msg: returnUnit};
      default:
        return {initNum: initNum.value, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit};
    }
  };
}

module.exports = ConvertHandler;

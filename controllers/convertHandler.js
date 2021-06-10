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

  this.getUnit = function(input) {
    console.log('init-unit-input = ', input);
    let result;
    const units = [ 'kg', 'gal', 'mi', 'km', 'lbs', 'l' ];
    result = input.replace(/[^a-zA-Z]/g,'').toLowerCase();
    if (!units.includes(result))  { return result = 'invalid unit' };
    if (result === 'l') { result = 'L' };
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'kg':
        result = 'lbs'
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'gal':
        result = 'L';
        break;
      default:
        result = 'invalid unit';
        break;
      
    };
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'kg':
        result = 'kilograms'
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'L':
        result = 'litres';
        break;
      case 'gal':
        result = 'gallons';
        break;
      default:
        result = 'invalid unit';
        break;
    };
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const conObj = {
    galToL: 3.78541,
    lbsTokg: 0.453592,
    miTokm: 1.60934
    }
    let result;
    let reg = new RegExp(initUnit);
    const conKey = Object.keys(conObj).find(key => key.match(reg));
    if (conKey.indexOf(initUnit) > 0) {
      result = parseFloat((initNum / conObj[conKey]).toFixed(5));
    } else {
      result = parseFloat((initNum * conObj[conKey]).toFixed(5));
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    
    return result;
  };
}

module.exports = ConvertHandler;

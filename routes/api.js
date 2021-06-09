'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;

    const json = convertHandler.getString(input);

    const fullInitUnit = convertHandler.spellOutUnit(json.initUnit);
    const fullReturnUnit = convertHandler.spellOutUnit(json.returnUnit);

    // if (!json.err) {
    //   json.initUnitStr = fullInitUnit;
    //   json.returnUnitStr = fullReturnUnit
    //   json.string = `${json.initNum} ${json.initNum === 1 ? fullInitUnit.substr(0, fullInitUnit.length -1 ): fullInitUnit} 👉🏾️ ${json.returnNum} ${json.returnNum === 1 ? fullReturnUnit.substr(0, fullReturnUnit.length -1 ) : fullReturnUnit}`;
    // }
    console.log(json);
    res.json(json);
  });

};

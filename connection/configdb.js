var sql = require("mssql");

var exports = module.exports = {};

var config = {
  user: 'nps_release_owner',
  password: 't]BBhG82)Q5N',
  host: 'nps-classification-app.database.windows.net',
  database: 'NPS-Classification-APP-DB-Release2',
  dialect: 'mssql',
  
  options: {
    encrypt: true
  }
}


exports.sql = sql;
exports.config = config;
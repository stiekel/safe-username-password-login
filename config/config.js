var config = {};
var statSync = require('fs').statSync;

var configPath = [__dirname, '/env/', (process.env.NODE_ENV || 'development'), '.js'].join('');

try {
  config = require(configPath);
} catch(e) {
  console.error('Can NOT find config file in:', configPath);
  process.exit(); 
}

module.exports= config;

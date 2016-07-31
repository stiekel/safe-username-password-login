var waterline = require('waterline');
var mongoAdapter = require('sails-mongo');
var diskAdapter = require('sails-disk');

var config = require('./config');

var orm = new waterline();
exports.config = {
  adapters: {
    mga: mongoAdapter,
    dka: diskAdapter
  },
  connections: {
    mongo: {
      adapter: 'mga',
      url: config.mongo
    },
    disk: {
      adapter: 'dka'
    }
  }
}

orm.loadCollection(require('../app/models/user.server.model'));
orm.loadCollection(require('../app/models/salt.server.model'));

exports.orm = orm;

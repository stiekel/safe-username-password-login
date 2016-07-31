var waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'user',
  connection: 'mongo',
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    saltId: {
      type: 'string',
      required: true
    }
  }
});

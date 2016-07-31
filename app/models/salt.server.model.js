var waterline = require('waterline');

module.exports = waterline.Collection.extend({
  identity: 'salt',
  connection: 'disk',
  schema: true,
  attributes: {
    id: {
      type: 'string',
      required: true
    },
    salt: {
      type: 'string',
      required: true
    }
  }
});

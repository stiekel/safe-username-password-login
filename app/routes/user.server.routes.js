var user = require('../controllers/user.server.controller');
module.exports = function(app){
  app.post('/user/login', user.login);
  app.post('/user/registry', user.registry);
};

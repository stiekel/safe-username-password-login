var sha256 = require('js-sha256').sha256;

module.exports = {
  registry: function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    if(!username) {
      return next(new Error('username required'));
    }
    if(!password) {
      return next(new Error('password required'));
    }
    // check is username exists
    req.models.user
    .findOne({username: username})
    .select('id')
    .exec(function(err, doc){
      if(err) return next(err);
      if(doc && doc.id) return next(new Error('username exists'));

      // add user 1, create salt, 2, create user
      req.models.salt.create({
        id: Math.random().toString(15).substr(3,19),
        salt: Math.random().toString(15).substr(3,27)
      }, function(err, salt){
        if(err) return next(err);
        if(!salt) return next(new Error('failed to create user salt'))

        req.models.user.create({
          username: username,
          password: encryptPwd(username, password, salt.salt),
          saltId: salt.id
        }, function(err, user){
          if(err) return next(err);
          if(!user) return next(new Error('failed to create user info'));

          res.json({username: username});
          return next();
        });
      });
    });
  },
  login: function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    if(!username) {
      return next(new Error('username required'));
    }
    if(!password) {
      return next(new Error('password required'));
    }
    // find saltId of the username
    req.models.user
    .findOne({select:['username', 'saltId'], where: {username: username}})
    .exec(function(err, userDoc){
      if(err) return next(err);
      if(!userDoc) return next(new Error('username not exists'));

      console.log('userDoc:', userDoc);
      // get salt
      req.models.salt
      .findOne({id: userDoc.saltId})
      .exec(function(err, saltDoc){
        if(err) return next(err);
        if(!saltDoc) return next(new Error('can NOT find salt'));

        // password check
        req.models.user
        .findOne({select: ['id'], where: {username: username, password: encryptPwd(username, password, saltDoc.salt) }})
        .exec(function(err, doc){
          if(err) return next(err);
          if(!doc) return next(new Error('password error'));

          res.json({
            username: username
          });

          return updateSalt(saltDoc, userDoc, password, next);
        });
      });
    });
  }
};

function encryptPwd(usr, pwd, salt){
  usr = usr.toLowerCase();
  return sha256(
    sha256(usr + sha256(pwd + salt)) + salt + sha256(usr + salt)
  )
}

function updateSalt(saltDoc, userDoc, passwordInputed, next){
  saltDoc.salt = Math.random().toString(15).substr(3,27);
  saltDoc.save(function(err){
    if(err) return next(err);
    userDoc.password = encryptPwd(userDoc.username, passwordInputed, saltDoc.salt);
    userDoc.save(function(err){
      if(err) return next(err);
      return next();
    });
  });
}

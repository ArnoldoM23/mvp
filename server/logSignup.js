var User = require('./mongoUtils'),
	Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {
  login: function(req, res, next){
    var username = req.body.username,
    	password = req.body.password;
    // promisefy the users find method.
    var findOne = Q.nbind(User.findOne, User);
    // check if the user exist
    findOne({username: username})
      .then(function(user){
        if (!user) { 
            next(new Error('User does not exitst'))
        }else{
         // compare passwords 
          return user.comparePasswords(password)
            .then(function(foundUser){
              if (foundUser) {
                // if they match create a token and send it back to the user
                var token = jwt.encode(user, 'secret')
                res.json({token:token})
              }else {
                return next(new Error('No user'));
              }
            })
        }
      })
      .fail(function (error) {
        next(error);
      });
    },

    signup: function(req, res, next){
    	var username = req.body.username,
    			password = req.body.password,
    			email = req.body.email
    			create,
        newUser;
    // bind the user with a promise
    var findOne = Q.nbind(User.findOne, User);
    // search to see if the user exist
    findOne({username: username})
    	.then(function(user){
    		if (user) {
    			next(new Error('Username already exist!'))
    		}else{
    			// promisesfy the user create function
    			create = Q.nbind(User.create, User)
    			newUser = {
    				username: username,
    				email: email,
    				password: password
    			};
    			return create(newUser);
    		}
    	})
    	.then(function(user){
    		var token = jwt.encode(user, 'secret');
    		res.json({token: token});
    	})
    	.fail(function(error){
    		next(error);
    	});
    }
}

// require dependencies and database file.
var express = require('express');
var bodyParser = require('body-parser');
var User = require('./mongoUtils');
var mongoose = require('mongoose');
var Q = require('q')
var jwt  = require('jwt-simple');
// connnect to database and server.
mongoose.connect('mongodb://localhost/users');
var app = express();
// use dependencies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


app.get('/login', function(req, res){

		console.log("hello")
		res.json("go ahed login");
	
});


app.post('/login', function(req, res, next){
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
    });

app.post('/signup', function(req, res, next){
	console.log('data from post request', req.body)
	var username = req.body.username,
			email 	 = req.body.email,
			password = req.body.password,
			create,
      newUser;
  // bind the user with a promise
  var findOne = Q.nbind(User.findOne, User);
  // search to see if the user exist
  findOne({username: username})
  	.then(function(user){
  		console.log('user in signup findOne', user)
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
  			console.log('creating a new user', create(newUser))
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
});

app.get('/home', function(req, res){
		console.log('We out here home page')
		res.json('We out here home page');

})
// listen for connection
app.listen(8000, function(){
	console.log('Listening on 8000');
});
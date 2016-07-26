// require dependencies and database file.
var express = require('express');
var bodyParser = require('body-parser');
var mongoUtils = require('./mongoUtils');
// connnect to database and server.
mongoUtils.connect();
var app = express();
// use dependencies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


app.get('/login', function(req, res){
	var names = mongoUtils.names();//invoking database function to get users collection
	names.find().toArray(function(err, docs){//storing the data in an array.
		console.log(docs)
		res.json(docs);
	});
});
app.get('/signup', function(req, res){
		console.log('signup')
		res.json('we out here signing up');

});

app.get('/home', function(req, res){
	business = mongoUtils.business();
	business.find().toArray(function(err, data){
		console.log('We out here home page', data)
		res.json('We out here home page');

	})
})
// listen for connection
app.listen(8000, function(){
	console.log('Listening on 8000');
});
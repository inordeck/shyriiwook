// requirements
var express = require('express');
var bodyParser = require('bodyParser');
var db = require('./models');

var app = express();


// MIDDLEWEAR //
// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES //
$.get('http://swapi.co/api/planets')
	.done(function(data){
		console.log(data);
	});

$.get('http://swapi.co/api/people')
	.done(function(data){
		console.log(data);
	});

$.get('http://swapi.co/api/species')
	.done(function(data){
		console.log(data);
	});

$.get('http://swapi.co/api/starships')
	.done(function(data){
		console.log(data);
	});



// START SERVER //
// establish listen and local host
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
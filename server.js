// REQUIREMENTS //

var express = require('express');
var app = express();

var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017');

var bodyParser = require('body-parser');
var db = require('./models');
var path = require('path');
var methodOverride = require('method-override');
var helpers = require('express-helpers');
	helpers(app);


// MIDDLEWEAR //

// serve static files in public and use ejs
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// ROUTES //

// planets
$.get('http://swapi.co/api/planets')
	.done(function(data){
		console.log(data);
	});

// people
$.get('http://swapi.co/api/people')
	.done(function(data){
		console.log(data);
	});

// species
$.get('http://swapi.co/api/species')
	.done(function(data){
		console.log(data);
	});

// starships
$.get('http://swapi.co/api/starships')
	.done(function(data){
		console.log(data);
	});


// START SERVER //

// establish listen and local host
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
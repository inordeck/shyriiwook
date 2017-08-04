var express = require('express');
var router = express.Router();

//parse info from POST
var bodyParser = require('body-parser');

// use to manipilate POST methods
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
	// if user is authenticated we continue the execution
	if(req.isAuthenticated()) return next();
	// otherwise request is always redirected to the home page
	res.redirect('/');
}

router.route('/')
	.get(staticsController.home);

router.route('/signup')
	.get(usersController.getSignup)
	.post(usersController.postSignup);

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin);

// router.route('/secret')
// 	.get(authenticatedUser, usersController.secret);

router.route('/logout')
	.get(usersController.getLogout);

/*
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
*/

module.exports = router;

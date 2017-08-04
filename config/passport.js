const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
	console.log("hello passport?");
	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		console.log("deserialize working?");
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	// SIGNUP
	passport.use('local-signup', new LocalStrategy({
		firstNameField: 'firstName',
		lastNameField: 'lastName',
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, firstName, lastName, email, password, callback) {
		// find user with a given email
		console.log("passport is running");
		User.findOne({ 'local.email': email }, function(err, user) {
			if(err) return callback(err);
			console.log("function ran");
			// if user already exists
			if(user) {
				console.log(user);
				return callback(null, false, req.flash('signupMessage', "this email already exists."));
			} else {
				// user does not exist / create a new user
				console.log("new user");
				let newUser = new User();
				newUser.local.firstName = firstName;
				newUser.local.lastName = lastName;
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);

				newUser.save(function(ertr) {
					if(err) throw err;
					return callback(null, newUser);
				});
			}
		});	
	}));

	// LOGIN

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, callback) {
		// search for a user with this email
		User.findOne({ 'local.email': email }, function(err, user) {
			if(err) {
				return callback(err);
			}
		// if no user is found
		if (!user) {
			return callback(null, false, req.flash('loginMessage', "no user found"));
		}
		// wrong password
		if (!user.validPassword(password)) {
			return callback(null, false, req.flash('loginMessage', "oops! wrong password"));
		}
		return callback(null, user);
		});
	}));

};
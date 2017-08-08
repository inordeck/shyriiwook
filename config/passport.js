var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, callback) {
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback) {
		User.findById(id, function(err, user) {
			callback(err, user);
		});
	});

	// SIGNUP //
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		// find user with same email
		User.findOne({ 'local.email' : email }, function(err, user) {
			if (err) return callback(err);

			// if the email already exists
			if (user) {
				return callback(null, false, req.flash('signupMessage', 'this email already exists.'));
			} else {
				// no user with this email / create a new user
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);
				newUser.save(function(err) {
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

	// LOGIN //
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback) {
		// search for user with this email
		User.findOne({ 'local-email' : email}, function(err, user) {
			if (err) {
				return callback(err);
			}
			// if no user is found
			if (!user) {
				return callback(null, false, req.flash('loginMessage', 'no user was found.'));
			}
			// wrong password
			if (!user.validPassword(password)) {
				return callback(null, false, req.flash('loginMessage', 'password is incorrect.'));
			}
			return callback(null, user);
		});
	}));
};

/* old
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

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
		console.log("passport is running");
		// find user with a given email
		User.findOne({ 'local.email': email }, function(err, user) {
			if(err) return callback(err);
			// if user already exists
			if(user) {
				console.log(user);
				return callback(null, false, req.flash('signupMessage', "this email already exists."));
			} else {
				// user does not exist / create a new user
				console.log("new user");
				var newUser = new User();
				newUser.local.firstName = firstName;
				newUser.local.lastName = lastName;
				newUser.local.email = email;
				newUser.local.password = newUser.hash(password);

				newUser.save(function(err) {
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

};*/
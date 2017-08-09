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
				console.log('user has been found');
				return callback(null, false, req.flash('signupMessage', "this email already exists."));
			} else {
				// no user with this email / create a new user
				console.log('no user with this email, continue');
				var newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.hash(password);
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
		console.log(email);
		User.findOne({ 'local.email' : email}, function(err, user) {
			if (err) {
				console.log('login not working');
				return callback(err);
			}
			// if no user is found
			if (!user) {
				console.log('no user found');
				return callback(null, false, req.flash('loginMessage', 'no user was found.'));
			}
			// wrong password
			if (!user.validPassword(password)) {
				console.log('wrong password');
				return callback(null, false, req.flash('loginMessage', 'password is incorrect.'));
			}
			// login info is a match
			return callback(null, user);
		});
	}));
};

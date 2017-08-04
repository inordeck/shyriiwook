var passport = require("passport");

// GET signup
function getSignup(req, res, next) {
	response.render('signup.ejs', { message: req.flash('signupMessage') });
}

// POST signup
function postSignup(req, res, next) {
	// save a new user
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});
return signupStrategy(req, res, next);
}

// GET login
function getLogin(req, res, next) {
	response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST login
function postLogin(req, res, next) {
	let loginStrategy = passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});
return loginStrategy(req, res, next);
}

// GET logout
function getLogout(req, res, next) {
	req.logout();
	res.redirect('/');
}

// exports
module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout
};

var passport = require('passport');

// SIGNUP //
// GET signup
function getSignup(request, response) {
	response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST signup
function postSignup(request, response, next) {
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect : '/',
		failureReddirect : '/signup',
		failureFlash : true
	});
	return signupStrategy(request, response, next);
}

// LOGIN //
// GET login
function getLogin(request, response) {
	response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST login
function postLogin(request, response, next) {
	var loginProperty = passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	});
	return loginProperty(request, response, next);
}

// LOGOUT //
// GET logout
function getLogout (request, response) {
	request.logout();
	response.redirect('/');
}

// RESTRICTED PAGES
function secret(request, response) {

}

// EXPORTS //
module.exports = {
	getLogin: getLogin,
	postLogin: postLogin,
	getSignup: getSignup,
	postSignup: postSignup,
	getLogout: getLogout,
	secret: secret
};

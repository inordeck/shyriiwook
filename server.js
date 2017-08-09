// REQUIREMENTS // 
var express 		= require('express');
var session 		= require('express-session');
var app 			= express();
var mongoose 		= require('mongoose');
var passport 		= require('passport');
var flash 			= require('connect-flash');
var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var path 			= require('path');
var methodOverride 	= require('method-override');
var db 				= require('./models');
var helpers 		= require('express-helpers');
	helpers(app);


// MIDDLEWEAR //
// database
mongoose.connect('mongodb://localhost/shyriiwook-db');

// serve static files in public and use ejs
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'what-a-wookie' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

// require passport
require('./config/passport')(passport);
app.use(function (req, res, next){
	res.locals.currentUser = req.user;
	next();
});


// ROUTES //
var routes = require('./config/routes');
app.use(routes);


// START SERVER //
// establish listen and local host
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
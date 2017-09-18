var expect = require("chai").expect;
var request = require('request');
var User = require('../models/user');

var app = require('../../app');
var User = require('./user.model');
var request = require('supertest');

var url = 'http://swapi.co/api/people/1';

request(url, function (error, response, body) {
	// print the error if one occurred
	console.log('error:', error);
	// print the response status code if a response was received
	console.log('statusCode:', response && response.statusCode);
	// print the html for the swapi page
	console.log('body:', body);  
});


describe("swapi", function() {
	var apiError, apiResponse, apiBody;
	before(function(done) {
		request(url, function(error, response, body) {
			apiError = error;
			apiResponse = response;
			apiBody = body;
			done();
		});
	});

	it("should return 200 - ok", function() {
		expect(apiResponse.statusCode).to.eq(200);
	});
	
	it("should return luke skywalker", function() {
		if(typeof(apiBody) === "string") {
			apiBody = JSON.parse(apiBody);
		}

		console.log(apiBody);
			expect(apiBody).to.not.be.empty;
	});
});

describe('User API:', function() {
  var user;

  // Clear users before testing
  before(function(done) {
    User.remove(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@test.com',
        password: 'password'
      });

      user.save(function(err) {
        if (err) return done(err);
        done();
      });
    });
  });

  // Clear users after testing
  after(function() {
    return User.remove().exec();
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body._id.should.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });
});
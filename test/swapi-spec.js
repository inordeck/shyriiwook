var expect = require("chai").expect;
var request = require('request');

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

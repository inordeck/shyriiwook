// requirements
var People = require('../models/people');
var URL = 'https://swapi.co/api';

// get by id

// pseudocode //
// get all swapi people names and save into shyriiwook-db
// for loop to get 3 names
// 

// GET ALL PEOPLE
function getAllPeople(req, res, next) {
	for (var i = 0; i < people.length; i++) {
		request(URL, function(err, res, body) {
			if (err) throw err;
			if (typeof(body) === 'string') {
				body = JSON.parse(body);
			}
			res.json(body.results);
		});
	}
}


module.exports = {
	getAllPeople: getAllPeople
};
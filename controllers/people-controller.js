var People = require('../models/people');

// get by id
function getOne(req, res) {
	People.findOne({ _id: req.params.id }, function(err, people) {
		if(err) response.json({ message: "could not find any people"});
	response.json({people: people});
	});
}

module.exports = {
	getOne: getOne
};
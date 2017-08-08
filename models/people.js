var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PeopleSchema = mongoose.Schema({
	name: String
});

var People = mongoose.model('People', PeopleSchema);

module.exports = People;

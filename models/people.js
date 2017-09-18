var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PeopleSchema = mongoose.Schema({
	swapiId: Number,
	name: String,
	wookieName: String
});

var People = mongoose.model('People', PeopleSchema);

module.exports = People;

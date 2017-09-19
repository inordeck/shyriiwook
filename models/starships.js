var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var StarshipSchema = mongoose.Schema({
	swapiId: Number,
	name: String,
	wookieName: String
});

var Starship = mongoose.model('Starship', StarshipSchema);

module.exports = Starship;

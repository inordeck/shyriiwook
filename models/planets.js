var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PlanetsSchema = mongoose.Schema({
	swapiId: Number,
	name: String,
	wookieName: String
});

var Planets = mongoose.model('Planets', PlanetsSchema);

module.exports = Planets;

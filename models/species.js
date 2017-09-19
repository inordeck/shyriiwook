var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SpeciesSchema = mongoose.Schema({
	swapiId: Number,
	name: String,
	wookieName: String
});

var Species = mongoose.model('Species', SpeciesSchema);

module.exports = Species;
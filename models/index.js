var mongoose = require('mongoose');
mongoose.connect(	process.env.MONGODB_URI || 
					"mongodb://localhost/shyriiwook-db" );

module.exports.user = require("./user.js");

// module.exports.Planets = require("./planets.js");
// module.exports.People = require("./people.js");
// module.exports.Species = require("./species.js");
// module.exports.Starships = require("./starships.js");
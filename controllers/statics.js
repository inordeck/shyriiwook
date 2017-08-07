// GET
function home(req, res) {
	res.render('index.ejs');
}

function subjects(req, res) {
	res.render('subjects.ejs');
}

function people(req, res) {
	res.render('people.ejs');
}

function planets(req, res) {
	res.render('planets.ejs');
}

function species(req, res) {
	res.render('species.ejs');
}

function starships(req, res) {
	res.render('starships.ejs');
}
module.exports = {
	home:home,
	subjects:subjects,
	people:people,
	planets:planets,
	species:species,
	starships:starships
};
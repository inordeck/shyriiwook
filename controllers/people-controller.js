// requirements
/*var db = require('../models');
var URL = 'https://swapi.co/api';



module.exports = {
	getAllPeople: getAllPeople,
	postPeople: postPeople
};*/

// OLD CODE //

// get by id

// pseudocode //
// get all swapi people names and save into shyriiwook-db
// for loop to get first 3 names
// 

// GET ALL PEOPLE
/*function getAllPeople(req, res) {
    res.json('yo');
}*/


// from corey
// Make request for ALLLLLLL people
/*function getPeople( req, res, next) {

    const allPeopleApi = 'https://swapi.co/api/people/';

request('https://swapi.co/api/people', response, error) {

    //response.body // make sure this is json
    if(typeof(req.body)=== 'string')req.body=JSON.parse(req.body);

    // Go through EACH person
    response.body.forEach(element => {
        // Start building a database entry for that person
        var person = new db.Person({
            swapiId: element.id,
            name: element.name
        });
        // Get the wookie version by making another API request
        request('https://swapi.co/api/people/' + element.id + '/?format=wookiee', res, err) {
            // with the NEW res data, save what we need.
            person.wookieName = res.body.whrascwo;
            person.save();
        }
    }); 
}
}*/

// post people
/*function postPeople(req, res, next) {
    if(typeof(req.body)=== 'string')req.body=JSON.parse(req.body);
    var newPeople = new db.People({
        swapiId: req.body.id,
        name: req.body.name,
        wookieName: req.body.
    });
}*/
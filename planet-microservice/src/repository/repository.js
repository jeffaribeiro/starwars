const mongodb = require("../config/mongodb");

function addPlanet(planet, callback){
    mongodb.connect((err, db) => {
        db.collection("planets").insertOne(planet, callback);
    });
}

function deletePlanet(id, callback){
    console.log("Repository - Apagar ID: " + id);
    mongodb.connect((err, db) => {
        db.collection("planets").deleteOne({ _id: require("mongodb").Long(id) }, callback);
    });
}

function getAllPlanets(callback){
    mongodb.connect((err, db) => {
        db.collection("planets").find().toArray(callback);
    });
}
 
function getPlanetById(id, callback){
    mongodb.connect((err, db) => {
        db.collection("planets").findOne({ _id: require("mongodb").Long(id) }, callback);
    });
}
 
function getPlanetByName(name, callback){
    mongodb.connect((err, db) => {
        db.collection("planets").findOne({ name: new RegExp('^' + name + '$', "i") }, callback);
    });
}

function disconnect(){
    return mongodb.disconnect();
}
 
module.exports = { addPlanet, deletePlanet, getAllPlanets, getPlanetById, getPlanetByName, disconnect }
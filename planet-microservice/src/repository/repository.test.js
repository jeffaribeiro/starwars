const test = require('tape');
const repository = require('./repository');
 
function runTests(){
 
    var id = null;
    var name = null;
    var planet = 
    {
        "_id": 2,
        "name": "Alderaan",
        "climate": "temperate",
        "terrain": "grasslands, mountains",
        "films": 2
    };

    test('Repository addPlanet', (t) => {
        if(!planet) {
            t.assert(false, "Planet Added");
            t.end();
            return;
        }

        repository.addPlanet(planet, (err, planets) => {          
            t.assert(!err && planets, "Planet Added");
            t.end();
        });
    })    

    test('Repository getAllPlanets', (t) => {
        repository.getAllPlanets((err, planets) => {
            if(planets && planets.length > 0) {
                id = planets[0]._id;
                name = planets[0].name;
            }
            
            t.assert(!err && planets && planets.length > 0, "All Planets Returned");
            t.end();
        });
    })
    
    test('Repository getPlanetById', (t) => {
        if(!id) {
            t.assert(false, "Planet by Id Returned");
            t.end();
            return;
        }
 
        repository.getPlanetById(id, (err, planet) => {
            t.assert(!err && planet, "Planet by Id Returned");
            t.end();
        });
    })
 
    test('Repository getPlanetByName', (t) => {
        if(!name) {
            t.assert(false, "Planet by Name Returned");
            t.end();
            return;
        }
        
        repository.getPlanetByName(name, (err, planet) => {
            t.assert(!err && planet, "Planet By Name Returned");
            t.end();
        });
    })

    test('Repository deletePlanet', (t) => {
        if(!planet._id) {
            t.assert(false, "Planet Removed");
            t.end();
            return;
        }

        repository.deletePlanet(planet._id, (err, planet) => {          
            t.assert(!err && planet, "Planet Removed");
            t.end();
        });
    }) 
 
    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect Ok");
        t.end();
    })
}
 
module.exports = { runTests }
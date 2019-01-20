module.exports = (app, repository) => {

  app.get('/planets', (req, res, next) => {
    repository.getAllPlanets((err, planets) => {
      if(err) return next(err);
      res.json(planets);
    });
  })
 
  app.get('/planets/byname/:name', (req, res, next) => {
    repository.getPlanetByName(req.params.name, (err, planet) => {
      if(err) return next(err);
      res.json(planet)
    });
  })
 
  app.get('/planets/:id', (req, res, next) => {
    repository.getPlanetById(req.params.id, (err, planet) => {
      if(err) return next(err);
      res.json(planet)
    });
  })

  app.post('/planets/', (req, res, next) => {
    var newplanet = 
    { 
      _id: req.body._id,
      name: req.body.name,
      climate: req.body.climate,
      terrain: req.body.terrain,
      films: req.body.films 
    }

    repository.addPlanet(newplanet, (err, planet) => {
      if(err) return next(err);
      res.json(planet);
    });
  })

  app.delete('/planets/:id', (req, res, next) => {
    console.log("API - Apagando ID: " + req.params.id);
    repository.deletePlanet(req.params.id, (err, planet) => {
      if(err) return next(err);
      res.json(planet)
    });
  })

}
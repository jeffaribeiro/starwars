require("dotenv-safe").load();
const planets = require('./api/planets');
const server = require("./server/server");
const repository = require("./repository/repository");
 
server.start(planets, repository, (err, app) => { 
    console.log("Serviço iniciado");
});
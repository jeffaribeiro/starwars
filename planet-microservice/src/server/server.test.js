const test = require('tape');
const server = require('./server');
 
function apiMock(app, repo){
    console.log("Mock da API criado...");
}
 
function runTests(){
 
    test('Server Start', (t) => {
        server.start(apiMock, null, (err, srv) => {
            t.assert(!err && srv, "Servidor iniciado");
            t.end();
        });
    })
    
    test('Server Stop', (t) => {
        t.assert(server.stop(), "Servidor parado");
        t.end();
    })
}
 
module.exports = { runTests }
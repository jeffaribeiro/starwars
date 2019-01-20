const test = require('tape');
const supertest = require('supertest');
const planets = require('./planets');
const server = require("../server/server");
const repository = require("../repository/repository");

function runTests(){

    var app = null;
    server.start(planets, repository, (err, app) => { 
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

        test('POST /planets/', (t) => {
            supertest(app)
            .post('/planets/')
            .send(planet)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) =>{
                t.error(err, 'No errors')
                t.assert(res.body, "Planet Added")
                t.end()  
            })
        })

        test('GET /planets', (t) => {
            supertest(app)
                .get('/planets')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    if(res.body && res.body.length > 0){
                        id = res.body[0]._id;
                        name = res.body[0].name;
                    } 
                    t.error(err, 'No errors')
                    t.assert(res.body && res.body.length > 0, "All Planets returned")
                    t.end()  
                })
        })
        
        test('GET /planets/:id', (t) => {
            if(!id) {
                t.assert(false, "Planet by Id Returned");
                t.end();
                return;
            }

            supertest(app)
                .get('/planets/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Planet By Id returned")
                    t.end()  
                })
        })

        test('GET /planets/byname/:name', (t) => {
            if(!name) {
                t.assert(false, "Planet by Name Returned");
                t.end();
                return;
            }    
            supertest(app)
                .get('/planets/byname/' + name)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Planet by Name returned")
                    t.end()  
                })
        })

        test('DELETE /planets/:id', (t) => {
            supertest(app)
            .del('/planets/'+ planet._id)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) =>{
                t.error(err, 'No errors')
                t.assert(res.body, "Planet Removed")
                t.end()  
            })
        })        

        test.onFinish(() => repository.disconnect());

        server.stop();
     })
}

module.exports = { runTests }
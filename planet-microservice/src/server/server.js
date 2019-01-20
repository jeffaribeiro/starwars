const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
var server = null;
 
function start(api, repository, callback){

  app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  app.use(bodyParser.json()); //parse application/json
  app.use(bodyParser.urlencoded({extended: false})); //parse application/x-www-form-urlencoded

  app.use(helmet());

  app.use((err, req, res, next) => {
      callback(new Error('Something went wrong!, err:' + err), null);
      res.status(500).send('Something went wrong!');
  })
  
  api(app, repository);
 
  // if (require.main === module){
    server = app.listen(parseInt(process.env.PORT), () => callback(null, server));
  // }
  
}
 
function stop(){
  if(server) server.close();
  return true;
}
 
module.exports = { start, stop }
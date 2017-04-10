var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var server = express();

server.set('view engine', 'ejs');
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());

//Routes
server.get('/', function(req, res) { res.render('index.ejs'); });

server.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

server.set("port", process.env.PORT || 3000);

var activeServer = server.listen(server.get("port"), () => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});
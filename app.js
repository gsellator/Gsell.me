var express = require('express');

// App Setup
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

//Routes
app.get('/', function(req, res) {
    if (req.param('msg')==1) { 
        res.render('index.ejs', {noty: ['Votre message a bien été envoyé !']});
    } else {
        res.render('index.ejs', {noty: []});
    }
});

app.get('/projects', function(req, res) {
    res.render('projects.ejs');
});

//app.get('/docs', function(req, res) {
//    res.render('docs.ejs');
//});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(3050);
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 3000;
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, function(){
    console.log('server online');
})

var people = [];

app.get('/', function(req, res){
    res.sendFile(path.resolve('public/views/index.html'));
    console.log('people lister running');
})

app.get('/person', function(req, res){
    res.send({peopleArray: people});
    console.log('people array sent to client');
})

app.post('/person', function(req, res){
    people.push(req.body);
    res.send('Data received');
    console.log('Received from client: ', req.body);
})
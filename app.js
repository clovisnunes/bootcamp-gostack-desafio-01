var express = require('express');
var app = express();

var projects = [];
projects.push({id: '1', title: 'Title 1', tasks: []}, {id: '2', title: 'Title 2', tasks: []});

app.get('/', function(req, res) {
    res.send('Get request');
});

app.post('/projects', function(req, res) {
    projects.push({id: req.id, title: req.title, tasks: []});
});

app.get('/projects', function(req, res) {
    res.send(projects);
});

app.put('/projects/:id', function(req, res) {
    for (var i = 0; i < projects.length; i++) {
        if(projects[i][id] == req.params.id) {
            projects[i]['title'] = req.title;
        }
    }
});

app.delete('/projects/:id', function(req, res) {
    for (var i = 0; i < projects.length; i++) {
        if(projects[i][id] == req.params.id) {
            delete projects[i];
        }
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000...')
});
var express = require('express');
var app = express();

app.use(express.json());

var totalReqs = 0;
var projects = [];
projects.push({id: '1', title: 'Title 1', tasks: []}, {id: '2', title: 'Title 2', tasks: []});

app.use(function(req, res, next) {
    console.log('Total de requisições: ' + ++totalReqs);
    next();
});

app.use('/projects/:id', function(req, res, next) {
    // check if id exists on projects
    var idcheck = projects.filter(element => element["id"] == req.params.id);
    if(idcheck == 0) {
        // error
        res.status(404).send('Id does not exist');
    } else {
        next();
    }
    
});

app.get('/', function(req, res) {
    res.send('Get request');
});

app.post('/projects', function(req, res) {  
    var inserted = { 'id': req.body['id'], 'title': req.body['title'], 'tasks': []}
    projects.push(inserted);

    res.send(inserted);
});

app.get('/projects', function(req, res) {
    res.send(projects);
});

app.put('/projects/:id', function(req, res) {
    var editedobj = {};
    for (var i = 0; i < projects.length; i++) {
        if(projects[i]['id'] == req.body['id']) {
            projects[i]['title'] = req.body['title'];
            editedobj = projects[i];
            break;
        }
    }

    res.send(editedobj);
});

app.delete('/projects/:id', function(req, res) {
    for (var i = 0; i < projects.length; i++) {
        if(projects[i]['id'] == req.params.id) {
            var deletedobj = projects.splice(i, 1);
            break;
        }
    }
    res.send(deletedobj);
});

app.post('/projects/:id/tasks', function(req, res) {
    var editedobj = {};
    for (var i = 0; i < projects.length; i++) {
        if(projects[i]['id'] == req.params.id) {
            projects[i]["tasks"].push(req.body['title']);
            editedobj = projects[i];
            break;
        }
    }

    res.send(editedobj);
});

app.listen(3000, function () {
    console.log('Listening on port 3000...')
});
//pull in necessary modules to build the server
const express = require('express');
const path = require('path');
const nanoid = require("nano-id");
const { createNewNote, deleteSelectedNote, findById } = require('./lib/notes'); 
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// set up app so that it can interpret the information and present user pages correctly
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// presents the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// presents the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// presents output of JSON file when looking at the api calls
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    });
    
});
// returns a single note based on the id
app.get('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const result = findById(req.params.id, JSON.parse(data).notes);
        res.json(result);
    });  
});
// if they go to a non-routed page it will go back to the index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// gets the information sent from the user form and puts it into a note
app.post('/api/notes', (req, res) => {
    req.body.id = nanoid(7).toString();
    console.log(req.body);

    if (!req.body.title || !req.body.text) {
        res.status(400).send('The note is not properly formatted');
    } else {
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            createNewNote(req.body, JSON.parse(data).notes);
        });
        
        res.json(req.body);
    }
});
// gets the information sent to delete the selected note
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        deleteSelectedNote(req.params.id, JSON.parse(data).notes);
    });   
    res.json(req.body);
})
// listens on the current port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
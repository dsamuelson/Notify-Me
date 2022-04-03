const express = require('express');
const path = require('path');
const nanoid = require("nano-id");
const { createNewNote, deleteSelectedNote, findById } = require('./lib/notes'); 
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    });
    
});

app.get('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const result = findById(req.params.id, JSON.parse(data).notes);
        res.json(result);
    });  
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

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

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        deleteSelectedNote(req.params.id, JSON.parse(data).notes);
    });   
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
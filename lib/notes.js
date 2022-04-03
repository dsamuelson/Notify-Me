const fs = require('fs');
const path = require('path');

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function deleteSelectedNote (id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);
    console.log(result);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: result }, null, 2)
    );
};

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

module.exports = {
    createNewNote,
    deleteSelectedNote,
    findById
}
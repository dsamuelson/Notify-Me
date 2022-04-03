const fs = require('fs');
const path = require('path');

// gets the information sent from the user and adds it to the notes db
function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}
// removes the selected note based on its id 
function deleteSelectedNote (id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);
    console.log(result);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: result }, null, 2)
    );
};
// returns the note found with the specific ID
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};
// exports functions to be called by server
module.exports = {
    createNewNote,
    deleteSelectedNote,
    findById
}
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNote');
const notesList = document.getElementById('notesList');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${note}</span>`;
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Supprimer';
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    });
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

addNoteButton.addEventListener('click', addNote);
renderNotes();
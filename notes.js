const noteInput = document.getElementById('noteInput');
const categoryInput = document.getElementById('categoryInput');
const addNoteButton = document.getElementById('addNote');
const notesList = document.getElementById('notesList');
const searchInput = document.getElementById('searchInput');
const exportPDFButton = document.getElementById('exportPDF');
const exportTextButton = document.getElementById('exportText');
const filterCategory = document.getElementById('filterCategory');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes(filter = '', categoryFilter = 'all') {
    notesList.innerHTML = '';
    notes
        .filter(note => note.text.toLowerCase().includes(filter.toLowerCase()))
        .filter(note => categoryFilter === 'all' || note.category === categoryFilter)
        .forEach((note, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${note.text} (${note.category})</span>`;
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
    const noteCategory = categoryInput.value;
    if (noteText !== '') {
        notes.push({ text: noteText, category: noteCategory });
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

function exportNotesToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    notes.forEach(note => {
        doc.text(`${note.text} (${note.category})`, 10, y);
        y += 10;
    });
    doc.save('notes.pdf');
}

function exportNotesToText() {
    let text = '';
    notes.forEach(note => {
        text += `${note.text} (${note.category})\n`;
    });
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'notes.txt';
    link.click();
}

addNoteButton.addEventListener('click', addNote);
searchInput.addEventListener('input', () => renderNotes(searchInput.value, filterCategory.value));
filterCategory.addEventListener('change', () => renderNotes(searchInput.value, filterCategory.value));
exportPDFButton.addEventListener('click', exportNotesToPDF);
exportTextButton.addEventListener('click', exportNotesToText);
renderNotes();
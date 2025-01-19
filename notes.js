const noteInput = document.getElementById('noteInput');
const categoryInput = document.getElementById('categoryInput');
const addNoteButton = document.getElementById('addNote');
const notesList = document.getElementById('notesList');
const searchInput = document.getElementById('searchInput');
const exportPDFButton = document.getElementById('exportPDF');
const exportTextButton = document.getElementById('exportText');
const filterCategory = document.getElementById('filterCategory');
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const imageInput = document.getElementById('imageInput');
const imageInputLabel = document.getElementById('imageInputLabel');
const languageSelector = document.getElementById('languageSelector');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = -1;
let currentLanguage = languageSelector.value;

function renderNotes(filter = '', categoryFilter = 'all') {
    notesList.innerHTML = '';
    notes
        .filter(note => note.text.toLowerCase().includes(filter.toLowerCase()))
        .filter(note => categoryFilter === 'all' || note.category === categoryFilter)
        .forEach((note, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${note.text} (${note.category})</span>`;
            if (note.image) {
                const img = document.createElement('img');
                img.src = note.image;
                li.appendChild(img);
            }
            const editButton = document.createElement('button');
            editButton.innerHTML = `<i class="fas fa-edit"></i> ${translations[currentLanguage].edit}`;
            editButton.addEventListener('click', () => {
                editIndex = index;
                noteInput.value = note.text;
                categoryInput.value = note.category;
                if (note.image) {
                    const img = document.createElement('img');
                    img.src = note.image;
                    imageInput.files = [img];
                }
                addNoteButton.innerHTML = `<i class="fas fa-save"></i> ${translations[currentLanguage].save}`;
            });
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `<i class="fas fa-trash"></i> ${translations[currentLanguage].delete}`;
            deleteButton.addEventListener('click', () => {
                deleteNote(index);
            });
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            notesList.appendChild(li);
        });
}

function addNote() {
    const noteText = noteInput.value.trim();
    const noteCategory = categoryInput.value;
    const noteImage = imageInput.files[0];
    if (noteText !== '') {
        const reader = new FileReader();
        reader.onload = function (e) {
            const note = {
                text: noteText,
                category: noteCategory,
                image: e.target.result
            };
            if (editIndex >= 0) {
                notes[editIndex] = note;
                editIndex = -1;
                addNoteButton.innerHTML = `<i class="fas fa-plus"></i> ${translations[currentLanguage].addNote}`;
            } else {
                notes.push(note);
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            imageInput.value = '';
            renderNotes();
        };
        if (noteImage) {
            reader.readAsDataURL(noteImage);
        } else {
            const note = {
                text: noteText,
                category: noteCategory,
                image: null
            };
            if (editIndex >= 0) {
                notes[editIndex] = note;
                editIndex = -1;
                addNoteButton.innerHTML = `<i class="fas fa-plus"></i> ${translations[currentLanguage].addNote}`;
            } else {
                notes.push(note);
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            renderNotes();
        }
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

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function applyTranslations(language) {
    currentLanguage = language;
    const elements = {
        title: document.getElementById('title'),
        warning: document.getElementById('warning'),
        toggleDarkMode: document.getElementById('toggleDarkMode'),
        searchInput: document.getElementById('searchInput'),
        noteInput: document.getElementById('noteInput'),
        addNote: document.getElementById('addNote'),
        exportPDF: document.getElementById('exportPDF'),
        exportText: document.getElementById('exportText'),
        filterCategory: document.getElementById('filterCategory'),
        categoryInput: document.getElementById('categoryInput'),
        imageInputLabel: document.getElementById('imageInputLabel')
    };

    const translation = translations[language];

    elements.title.textContent = translation.title;
    elements.warning.textContent = translation.warning;
    elements.toggleDarkMode.innerHTML = `<i class="fas fa-moon"></i> ${translation.darkMode}`;
    elements.searchInput.placeholder = translation.searchPlaceholder;
    elements.noteInput.placeholder = translation.notePlaceholder;
    elements.addNote.innerHTML = `<i class="fas fa-plus"></i> ${translation.addNote}`;
    elements.exportPDF.innerHTML = `<i class="fas fa-file-pdf"></i> ${translation.exportPDF}`;
    elements.exportText.innerHTML = `<i class="fas fa-file-alt"></i> ${translation.exportText}`;
    elements.imageInputLabel.innerHTML = `<i class="fas fa-upload"></i> ${translation.chooseImage}`;

    const filterOptions = elements.filterCategory.options;
    filterOptions[0].textContent = translation.allCategories;
    filterOptions[1].textContent = translation.general;
    filterOptions[2].textContent = translation.work;
    filterOptions[3].textContent = translation.personal;

    const categoryOptions = elements.categoryInput.options;
    categoryOptions[0].textContent = translation.general;
    categoryOptions[1].textContent = translation.work;
    categoryOptions[2].textContent = translation.personal;

    renderNotes(searchInput.value, filterCategory.value);
}

languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    applyTranslations(selectedLanguage);
});

addNoteButton.addEventListener('click', addNote);
searchInput.addEventListener('input', () => renderNotes(searchInput.value, filterCategory.value));
filterCategory.addEventListener('change', () => renderNotes(searchInput.value, filterCategory.value));
exportPDFButton.addEventListener('click', exportNotesToPDF);
exportTextButton.addEventListener('click', exportNotesToText);
toggleDarkModeButton.addEventListener('click', toggleDarkMode);
renderNotes();
applyTranslations(languageSelector.value);
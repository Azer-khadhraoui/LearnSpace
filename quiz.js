const quizzes = [
    [
        {
            question: "Quel est le langage de programmation le plus utilisé en 2021 ?",
            options: ["Python", "JavaScript", "Java", "C++"],
            correct: "JavaScript"
        },
        {
            question: "Quel est le créateur du langage de programmation Python ?",
            options: ["Guido van Rossum", "James Gosling", "Bjarne Stroustrup", "Dennis Ritchie"],
            correct: "Guido van Rossum"
        },
        {
            question: "Quel est le but principal du protocole HTTP ?",
            options: ["Transférer des fichiers", "Transférer des pages web", "Transférer des emails", "Transférer des vidéos"],
            correct: "Transférer des pages web"
        }
    ],
    [
        {
            question: "Quel est le système d'exploitation open-source le plus populaire ?",
            options: ["Windows", "macOS", "Linux", "Android"],
            correct: "Linux"
        },
        {
            question: "Quel est le créateur du système d'exploitation Linux ?",
            options: ["Linus Torvalds", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
            correct: "Linus Torvalds"
        },
        {
            question: "Quel est le but principal du langage SQL ?",
            options: ["Créer des sites web", "Gérer des bases de données", "Développer des applications mobiles", "Analyser des données"],
            correct: "Gérer des bases de données"
        }
    ],
    [
        {
            question: "Quel est le langage de balisage utilisé pour structurer les pages web ?",
            options: ["HTML", "CSS", "JavaScript", "XML"],
            correct: "HTML"
        },
        {
            question: "Quel est le langage de style utilisé pour styliser les pages web ?",
            options: ["HTML", "CSS", "JavaScript", "XML"],
            correct: "CSS"
        },
        {
            question: "Quel est le but principal du langage JavaScript ?",
            options: ["Créer des sites web statiques", "Créer des sites web dynamiques", "Gérer des bases de données", "Analyser des données"],
            correct: "Créer des sites web dynamiques"
        }
    ]
];

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

const quizTitle = document.getElementById('quiz-title');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const nextQuestionButton = document.getElementById('next-question');
const returnToSelectionButton = document.getElementById('return-to-selection');
const quizSelection = document.getElementById('quiz-selection');
const quizContainer = document.getElementById('quiz-container');

function startQuiz(quizIndex) {
    currentQuizIndex = quizIndex;
    currentQuestionIndex = 0;
    score = 0;
    quizSelection.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = quizzes[currentQuizIndex][currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
    quizOptions.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(button, option));
        quizOptions.appendChild(button);
    });
    nextQuestionButton.style.display = 'none';
    returnToSelectionButton.style.display = 'none';
}

function selectOption(button, selectedOption) {
    const currentQuestion = quizzes[currentQuizIndex][currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }
    disableOptions();
    nextQuestionButton.style.display = 'block';
}

function disableOptions() {
    const buttons = quizOptions.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === quizzes[currentQuizIndex][currentQuestionIndex].correct) {
            button.classList.add('correct');
        }
    });
}

function showResults() {
    quizTitle.textContent = "Résultats";
    quizQuestion.textContent = `Vous avez obtenu ${score} sur ${quizzes[currentQuizIndex].length} bonnes réponses.`;
    quizOptions.innerHTML = '';
    nextQuestionButton.style.display = 'none';
    returnToSelectionButton.style.display = 'block';
}

function returnToSelection() {
    quizContainer.style.display = 'none';
    quizSelection.style.display = 'block';
}

nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizzes[currentQuizIndex].length) {
        loadQuestion();
        nextQuestionButton.style.display = 'none';
    } else {
        showResults();
    }
});
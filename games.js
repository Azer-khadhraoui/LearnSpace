// Jeu de mémoire
function startMemoryGame() {
    const memoryGameContainer = document.createElement('div');
    memoryGameContainer.id = 'memory-game-container';
    memoryGameContainer.innerHTML = `
        <h2>Jeu de mémoire</h2>
        <div id="memory-cards-container"></div>
        <button onclick="resetMemoryGame()">Réinitialiser le jeu</button>
        <button onclick="showGamesContainer()"><i class="fas fa-arrow-left"></i> Retour aux jeux</button>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(memoryGameContainer);
    initializeMemoryGame();
}

function initializeMemoryGame() {
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    const shuffledCards = cards.sort(() => 0.5 - Math.random());
    const memoryCardsContainer = document.getElementById('memory-cards-container');
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        memoryCardsContainer.appendChild(cardElement);
    });
}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    if (matchedPairs === 4) {
        setTimeout(() => {
            alert('Félicitations ! Vous avez gagné !');
        }, 500);
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500); // Temps pendant lequel les cartes restent révélées
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetMemoryGame() {
    document.getElementById('memory-cards-container').innerHTML = '';
    matchedPairs = 0;
    initializeMemoryGame();
}

// Jeu de mathématiques
let currentQuestion = null;
let correctAnswer = null;

function startMathGame() {
    const mathGameContainer = document.createElement('div');
    mathGameContainer.id = 'math-game-container';
    mathGameContainer.innerHTML = `
        <h2>Jeu de mathématiques</h2>
        <div id="math-question-container"></div>
        <input type="number" id="math-answer" placeholder="Votre réponse">
        <button onclick="checkMathAnswer()">Vérifier</button>
        <button onclick="saveAndGoToCalculator()">Calculatrice</button>
        <button onclick="showGamesContainer()"><i class="fas fa-arrow-left"></i> Retour aux jeux</button>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(mathGameContainer);
    if (currentQuestion) {
        displayCurrentQuestion();
    } else {
        generateMathQuestion();
    }
}

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 100) + 1; // Augmenter la plage des nombres
    const num2 = Math.floor(Math.random() * 100) + 1; // Augmenter la plage des nombres
    const operations = ['%', '//', 'AND', 'OR'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let correctAnswer;
    let question;

    switch (operation) {
        case '%':
            correctAnswer = num1 % num2;
            question = `${num1} % ${num2}`;
            break;
        case '//':
            correctAnswer = Math.floor(num1 / num2);
            question = `${num1} // ${num2}`;
            break;
        case 'AND':
            correctAnswer = (num1 & num2).toString(2);
            question = `${num1.toString(2)} AND ${num2.toString(2)}`;
            break;
        case 'OR':
            correctAnswer = (num1 | num2).toString(2);
            question = `${num1.toString(2)} OR ${num2.toString(2)}`;
            break;
    }

    currentQuestion = { question, answer: correctAnswer.toString() };
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    const questionElement = document.getElementById('math-question');
    questionElement.textContent = currentQuestion.question;
}

function checkMathAnswer() {
    const userAnswer = parseFloat(document.getElementById('math-answer').value);
    if (userAnswer === parseFloat(correctAnswer)) {
        alert('Bonne réponse !');
        currentQuestion = null;
        generateMathQuestion();
    } else {
        alert('Mauvaise réponse. Réessayez.');
    }
    document.getElementById('math-answer').value = '';
}

function saveAndGoToCalculator() {
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('correctAnswer', correctAnswer);
    location.href = 'calculator.html';
}

function loadMathGameState() {
    currentQuestion = localStorage.getItem('currentQuestion');
    correctAnswer = localStorage.getItem('correctAnswer');
    if (currentQuestion) {
        startMathGame();
    }
}

function showGamesContainer() {
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('correctAnswer');
    location.href = 'games.html';
}

window.addEventListener('load', loadMathGameState);

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-math-game');
    const questionElement = document.getElementById('math-question');
    const answerInput = document.getElementById('math-answer');
    const submitButton = document.getElementById('submit-answer');
    const resultElement = document.getElementById('math-result');
    const scoreElement = document.getElementById('math-score');
    let currentQuestion = {};
    let score = 0;

    const questions = [
        {
            question: "Convertir 1010 en décimal",
            answer: "10"
        },
        {
            question: "Convertir 15 en binaire",
            answer: "1111"
        },
        {
            question: "Quel est le résultat de 1010 AND 1100 en binaire?",
            answer: "1000"
        },
        {
            question: "Convertir 1A en décimal (hexadécimal)",
            answer: "26"
        },
        {
            question: "Convertir 255 en hexadécimal",
            answer: "FF"
        },
        {
            question: "Quel est le résultat de 1010 OR 0101 en binaire?",
            answer: "1111"
        },
        {
            question: "Convertir 1111 en décimal",
            answer: "15"
        }
    ];

    function startGame() {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        nextQuestion();
    }

    function nextQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        questionElement.textContent = currentQuestion.question;
        answerInput.value = '';
        resultElement.textContent = '';
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim();
        if (userAnswer === currentQuestion.answer) {
            resultElement.textContent = 'Correct!';
            score++;
        } else {
            resultElement.textContent = `Incorrect! La bonne réponse est ${currentQuestion.answer}`;
        }
        scoreElement.textContent = `Score: ${score}`;
        setTimeout(nextQuestion, 2000);
    }

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkAnswer);
});

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-math-info-game');
    const questionElement = document.getElementById('math-info-question');
    const answerInput = document.getElementById('math-info-answer');
    const submitButton = document.getElementById('submit-info-answer');
    const resultElement = document.getElementById('math-info-result');
    const scoreElement = document.getElementById('math-info-score');
    let currentQuestion = {};
    let score = 0;

    const questions = [
        {
            question: "Convertir 1010 en décimal",
            answer: "10"
        },
        {
            question: "Convertir 15 en binaire",
            answer: "1111"
        },
        {
            question: "Quel est le résultat de 1010 AND 1100 en binaire?",
            answer: "1000"
        },
        {
            question: "Convertir 1A en décimal (hexadécimal)",
            answer: "26"
        },
        {
            question: "Convertir 255 en hexadécimal",
            answer: "FF"
        },
        {
            question: "Quel est le résultat de 1010 OR 0101 en binaire?",
            answer: "1111"
        },
        {
            question: "Convertir 1111 en décimal",
            answer: "15"
        },
        {
            question: "Quel est le résultat de 10 % 3?",
            answer: "1"
        },
        {
            question: "Quel est le résultat de 10 // 3?",
            answer: "3"
        },
        {
            question: "Convertir 1101 en décimal",
            answer: "13"
        },
        {
            question: "Convertir 2F en décimal (hexadécimal)",
            answer: "47"
        },
        {
            question: "Quel est le résultat de 1101 AND 1011 en binaire?",
            answer: "1001"
        },
        {
            question: "Quel est le résultat de 1101 OR 1011 en binaire?",
            answer: "1111"
        },
        {
            question: "Convertir 3C en décimal (hexadécimal)",
            answer: "60"
        },
        {
            question: "Convertir 101 en décimal",
            answer: "5"
        },
        {
            question: "Convertir 7F en décimal (hexadécimal)",
            answer: "127"
        },
        {
            question: "Quel est le résultat de 1111 AND 0110 en binaire?",
            answer: "0110"
        },
        {
            question: "Quel est le résultat de 1111 OR 0110 en binaire?",
            answer: "1111"
        },
        {
            question: "Convertir 1001 en décimal",
            answer: "9"
        },
        {
            question: "Convertir 4B en décimal (hexadécimal)",
            answer: "75"
        }
    ];

    function startGame() {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        nextQuestion();
    }

    function nextQuestion() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        questionElement.textContent = currentQuestion.question;
        answerInput.value = '';
        resultElement.textContent = '';
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim();
        if (userAnswer === currentQuestion.answer) {
            resultElement.textContent = 'Correct!';
            score++;
        } else {
            resultElement.textContent = `Incorrect! La bonne réponse est ${currentQuestion.answer}`;
        }
        scoreElement.textContent = `Score: ${score}`;
        setTimeout(nextQuestion, 2000);
    }

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkAnswer);
});

function startMathInfoGame() {
    document.getElementById('games-container').style.display = 'none';
    document.getElementById('math-info-game').style.display = 'block';
}

function showGamesContainer() {
    document.getElementById('math-info-game').style.display = 'none';
    document.getElementById('games-container').style.display = 'block';
}

// Jeu de devinettes de mots
let wordToGuess = '';
let guessedLetters = [];
let remainingAttempts = 6;

function startWordGuessGame() {
    const wordGuessGameContainer = document.createElement('div');
    wordGuessGameContainer.id = 'word-guess-game-container';
    wordGuessGameContainer.innerHTML = `
        <h2>Jeu de devinettes de mots</h2>
        <div id="word-to-guess-container"></div>
        <div id="guessed-letters-container"></div>
        <div id="remaining-attempts-container"></div>
        <input type="text" id="letter-input" maxlength="1" placeholder="Entrez une lettre">
        <button onclick="guessLetter()">Deviner</button>
        <button onclick="resetWordGuessGame()">Réinitialiser le jeu</button>
        <button onclick="showGamesContainer()"><i class="fas fa-arrow-left"></i> Retour aux jeux</button>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(wordGuessGameContainer);
    initializeWordGuessGame();
}

function initializeWordGuessGame() {
    const words = ['javascript', 'html', 'css', 'python', 'java'];
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    updateWordToGuessContainer();
    updateGuessedLettersContainer();
    updateRemainingAttemptsContainer();
}

function updateWordToGuessContainer() {
    const wordToGuessContainer = document.getElementById('word-to-guess-container');
    wordToGuessContainer.textContent = wordToGuess.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
}

function updateGuessedLettersContainer() {
    const guessedLettersContainer = document.getElementById('guessed-letters-container');
    guessedLettersContainer.textContent = `Lettres devinées : ${guessedLetters.join(', ')}`;
}

function updateRemainingAttemptsContainer() {
    const remainingAttemptsContainer = document.getElementById('remaining-attempts-container');
    remainingAttemptsContainer.textContent = `Tentatives restantes : ${remainingAttempts}`;
}

function guessLetter() {
    const letterInput = document.getElementById('letter-input');
    const guessedLetter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (!guessedLetter || guessedLetters.includes(guessedLetter)) {
        return;
    }

    guessedLetters.push(guessedLetter);

    if (!wordToGuess.includes(guessedLetter)) {
        remainingAttempts--;
    }

    updateWordToGuessContainer();
    updateGuessedLettersContainer();
    updateRemainingAttemptsContainer();

    if (remainingAttempts === 0) {
        alert(`Vous avez perdu ! Le mot était : ${wordToGuess}`);
        resetWordGuessGame();
    } else if (wordToGuess.split('').every(letter => guessedLetters.includes(letter))) {
        alert('Félicitations ! Vous avez deviné le mot !');
        resetWordGuessGame();
    }
}

function resetWordGuessGame() {
    initializeWordGuessGame();
}
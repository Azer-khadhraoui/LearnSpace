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
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = (num1 / num2).toFixed(2); // Limiter à 2 décimales pour la division
            break;
    }

    currentQuestion = `Combien font ${num1} ${operation} ${num2} ?`;
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    document.getElementById('math-question-container').textContent = currentQuestion;
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
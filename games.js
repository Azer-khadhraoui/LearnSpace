// Jeu de mémoire
function startMemoryGame() {
    const memoryGameContainer = document.createElement('div');
    memoryGameContainer.id = 'memory-game-container';
    memoryGameContainer.innerHTML = `
        <h2>Jeu de mémoire</h2>
        <div id="memory-cards-container"></div>
        <button onclick="resetMemoryGame()">Réinitialiser le jeu</button>
        <button onclick="location.href='games.html'"><i class="fas fa-arrow-left"></i> Retour aux jeux</button>
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
function startMathGame() {
    const mathGameContainer = document.createElement('div');
    mathGameContainer.id = 'math-game-container';
    mathGameContainer.innerHTML = `
        <h2>Jeu de mathématiques</h2>
        <div id="math-question-container"></div>
        <input type="number" id="math-answer" placeholder="Votre réponse">
        <button onclick="checkMathAnswer()">Vérifier</button>
        <button onclick="location.href='games.html'"><i class="fas fa-arrow-left"></i> Retour aux jeux</button>
    `;
    document.body.innerHTML = '';
    document.body.appendChild(mathGameContainer);
    generateMathQuestion();
}

let correctAnswer;

function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    document.getElementById('math-question-container').textContent = `Combien font ${num1} + ${num2} ?`;
}

function checkMathAnswer() {
    const userAnswer = parseInt(document.getElementById('math-answer').value);
    if (userAnswer === correctAnswer) {
        alert('Bonne réponse !');
    } else {
        alert('Mauvaise réponse. Réessayez.');
    }
    generateMathQuestion();
    document.getElementById('math-answer').value = '';
}
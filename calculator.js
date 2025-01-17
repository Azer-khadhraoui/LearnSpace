const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === '=') {
            if (currentInput && previousInput && operator) {
                currentInput = eval(`${previousInput}${operator}${currentInput}`);
                display.value = currentInput;
                previousInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput || previousInput) {
                if (currentInput) {
                    previousInput = currentInput;
                }
                currentInput = '';
                operator = value;
                display.value = previousInput + operator;
            }
        } else if (value === 'Del') {
            if (currentInput) {
                currentInput = currentInput.slice(0, -1);
                display.value = previousInput + operator + currentInput;
            } else if (operator) {
                operator = '';
                display.value = previousInput;
            } else if (previousInput) {
                previousInput = previousInput.slice(0, -1);
                display.value = previousInput;
            }
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else if (value === 'CE') {
            currentInput = '';
            display.value = previousInput + operator;
        } else {
            currentInput += value;
            display.value = previousInput + operator + currentInput;
        }
    });
});

// Ajout de la fonctionnalité de clavier
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        currentInput += key;
        display.value = previousInput + operator + currentInput;
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (currentInput || previousInput) {
            if (currentInput) {
                previousInput = currentInput;
            }
            currentInput = '';
            operator = key;
            display.value = previousInput + operator;
        }
    } else if (key === 'Enter' || key === '=') {
        if (currentInput && previousInput && operator) {
            currentInput = eval(`${previousInput}${operator}${currentInput}`);
            display.value = currentInput;
            previousInput = '';
            operator = '';
        }
    } else if (key === 'Backspace') {
        if (currentInput) {
            currentInput = currentInput.slice(0, -1);
            display.value = previousInput + operator + currentInput;
        } else if (operator) {
            operator = '';
            display.value = previousInput;
        } else if (previousInput) {
            previousInput = previousInput.slice(0, -1);
            display.value = previousInput;
        }
    } else if (key === 'Escape') {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.value = '';
    }
});
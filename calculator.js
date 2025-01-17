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
        } else if (value === 'Delete') {
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
        } else if (value === 'Clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '';
        } else {
            currentInput += value;
            display.value = previousInput + operator + currentInput;
        }
    });
});
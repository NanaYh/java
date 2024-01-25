document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator')
    const keys = calculator.querySelector('.calculator__keys')
    const display = document.querySelector('.calculator__display')

    keys.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;
            const displayedNum = display.textContent;

            if (!action) {
                // Handle number key
                if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }
            }

            if (action === 'decimal') {
                // Handle decimal key
                display.textContent = displayedNum + '.';
            }

            if (action === 'clear') {
                // Handle clear key
                display.textContent = '0';
            }

            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ) {
                // Handle operator key
                key.classList.add('is-depressed');
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;
            }

            if (action === 'calculate') {
                // Handle calculate key
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;
                display.textContent = calculate(firstValue, operator, secondValue);
            }
        }
    });

    keys.addEventListener('transitionend', (e) => {
        // Remove 'is-depressed' class after the transition ends
        if (e.propertyName === 'transform') {
            const key = e.target;
            key.classList.remove('is-depressed');
        }
    });

    function calculate(n1, operator, n2) {
        let result = '';

        if (operator === 'add') {
            result = parseFloat(n1) + parseFloat(n2);
        } else if (operator === 'subtract') {
            result = parseFloat(n1) - parseFloat(n2);
        } else if (operator === 'multiply') {
            result = parseFloat(n1) * parseFloat(n2);
        } else if (operator === 'divide') {
            result = parseFloat(n1) / parseFloat(n2);
        }

        return result.toString(); // Convert the result to a string before returning
    }
});
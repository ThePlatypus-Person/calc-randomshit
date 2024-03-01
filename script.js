const buttonList = document.querySelectorAll('button');

const screen = document.querySelector('.screen');

let tempNum = '';
let resultNum = '';
let tempOperator = '';

buttonList.forEach(button => {
    button.addEventListener('click', (e) => {
        const className = e.target.classList[0];
        const text = e.target.textContent;

        if (className === 'number') {
            inputNumber(text);
        } else if (className === 'operator') {
            inputOperator(text);
        } else if (className === 'clear') {
            inputClear();
        } else {
            inputEquals();
        }
    });
});


const numberList = '0123456789.'.split('');
const operatorList = '+-*/'.split('');

window.addEventListener('keydown', (e) => {
    const keyIsNumber = numberList.includes(e.key);
    const keyIsOperator = operatorList.includes(e.key);

    if (keyIsNumber) {
        inputNumber(e.key);
    } else if (keyIsOperator) {
        inputOperator(e.key);
    } else if (e.key === 'Escape') {
        inputClear();
    } else if (e.key === 'Enter') {
        inputEquals();
    }

});

function inputClear() {
    tempNum = '';
    resultNum = '';
    tempOperator = '';
    screen.textContent = '';
}

function inputEquals() {
    const num1 = resultNum;
    const num2 = tempNum;

    tempNum = operate(tempOperator, resultNum, tempNum);
    resultNum = '';

    screen.textContent = `${num1} ${tempOperator} ${num2} = ${tempNum}`;
    return;
}

function inputOperator(text) {
    if (tempNum === '')
        return;

    if (resultNum !== '' && tempOperator !== '') {
        tempNum = operate(tempOperator, resultNum, tempNum);
        resultNum = '';
        screen.textContent = `${tempNum} ${tempOperator}`;
        return;
    }

    tempOperator = text;
    screen.textContent = `${tempNum} ${tempOperator}`;
}

function inputNumber(text) {
    if (text === '0' && tempNum[0] === '0')
        return;

    if (text !== '.' && tempNum[0] === '0' && tempNum.length === 1) {
        tempNum = text;
        screen.textContent = tempNum;
        return;
    }

    if (text === '.' && tempNum.includes('.'))
        return;

    if (tempOperator !== '' && resultNum === '') {
        resultNum = tempNum;
        tempNum = text;
        screen.textContent = `${resultNum} ${tempOperator} ${tempNum}`;
        return;
    }

    if (tempOperator !== '' && resultNum !== '') {
        tempNum += text;
        screen.textContent = `${resultNum} ${tempOperator} ${tempNum}`;
        return;
    }

    tempNum += text;
    screen.textContent = tempNum;
}



function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return (num1 / num2).toFixed(3);
    }
}

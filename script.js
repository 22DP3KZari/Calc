// DOM Elements
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const valueEl = document.querySelector('#display');

const acEl = document.querySelector('.ac');
const pmEl = document.querySelector('.pm');
const percentEl = document.querySelector('.percent');

const additionEl = document.querySelector('.addition');
const subtractionEl = document.querySelector('.subtraction');
const multiplicationEl = document.querySelector('.multiplication');
const divisionEl = document.querySelector('.division');
const equalEl = document.querySelector('.equal');

const decimalEl = document.querySelector('.decimal');
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2');
const number3El = document.querySelector('.number-3');
const number4El = document.querySelector('.number-4');
const number5El = document.querySelector('.number-5');
const number6El = document.querySelector('.number-6');
const number7El = document.querySelector('.number-7');
const number8El = document.querySelector('.number-8');
const number9El = document.querySelector('.number-9');
const numberElArray = [
    number0El, number1El, number2El, number3El, number4El,
    number5El, number6El, number7El, number8El, number9El
];

// New DOM Elements for history
const historyEl = document.querySelector('.history');
const clearHistoryEl = document.querySelector('.clear-history');
const toggleHistoryEl = document.querySelector('.toggle-history');

// Array to store history
let history = [];

// Function to update history display
function updateHistoryDisplay() {
    historyEl.innerHTML = history.map(entry => `<li>${entry}</li>`).join('');
}

// Function to add entry to history
function addToHistory(entry) {
    history.push(entry);
    updateHistoryDisplay();
}

// Event listener for clear history button
clearHistoryEl.addEventListener('click', () => {
    history = [];
    updateHistoryDisplay();
});

toggleHistoryEl.addEventListener('click', () => {
    if (historyEl.style.display === 'none' || historyEl.style.display === '') {
        historyEl.style.display = 'block';
    } else {
        historyEl.style.display = 'none';
    }
});

let operator = '';
let previousValueStr = '';
let currentValueStr = '';

// Functions
const getValueAsStr = () => valueEl.textContent.split(',').join('');
const getValueAsNum = () => parseFloat(getValueAsStr());
const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        valueEl.textContent += '.';
    } else {
        const [wholeNumStr, decimalStr] = valueStr.split('.');
        if (decimalStr) {
            valueEl.textContent = `${parseFloat(wholeNumStr).toLocaleString()}.${decimalStr}`;
        } else {
            valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
        }
    }
};

const handleNumberClick = (numStr) => {
    const currentDisplayStr = getValueAsStr();
    if (currentDisplayStr === '0') {
        setStrAsValue(numStr);
    } else {
        setStrAsValue(currentDisplayStr + numStr);
    }
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();
  if (!operator) {
    previousValueStr = currentValueStr;
    operator = operation;
    setStrAsValue('0');
  } else {
    const currentValueNum = getValueAsNum();
    const previousValueNum = parseFloat(previousValueStr);

    let newValueNum;
    if (operator === 'addition') {
      newValueNum = previousValueNum + currentValueNum;
    } else if (operator === 'subtraction') {
      newValueNum = previousValueNum - currentValueNum;
    } else if (operator === 'multiplication') {
      newValueNum = previousValueNum * currentValueNum;
    } else if (operator === 'division') {
      if (currentValueNum === 0) {
        valueEl.innerText = 'Error';
        operator = '';
        previousValueStr = '';
        currentValueStr = '';
        return;
      }
      newValueNum = previousValueNum / currentValueNum;
    }

    addToHistory(`${previousValueStr} ${operator} ${currentValueStr} = ${newValueNum}`);
    setStrAsValue(newValueNum.toString());
    previousValueStr = newValueNum.toString();
    operator = operation;
  }
};

const calculateResult = () => {
  const currentValueNum = getValueAsNum();
  const previousValueNum = parseFloat(previousValueStr);

  let result;
  if (operator === 'addition') {
    result = previousValueNum + currentValueNum;
  } else if (operator === 'subtraction') {
    result = previousValueNum - currentValueNum;
  } else if (operator === 'multiplication') {
    result = previousValueNum * currentValueNum;
  } else if (operator === 'division') {
    if (currentValueNum === 0) {
      return 'Error';
    }
    result = previousValueNum / currentValueNum;
  }

  return result;
};

const clearDisplay = () => {
  valueEl.innerText = '0';
  operator = '';
  previousValueStr = '';
  currentValueStr = '';
};

numberElArray.forEach((numberEl, index) => {
    numberEl.addEventListener('click', () => handleNumberClick(index.toString()));
});

additionEl.addEventListener('click', () => handleOperatorClick('addition'));
subtractionEl.addEventListener('click', () => handleOperatorClick('subtraction'));
multiplicationEl.addEventListener('click', () => handleOperatorClick('multiplication'));
divisionEl.addEventListener('click', () => handleOperatorClick('division'));

equalEl.addEventListener('click', () => {
  const result = calculateResult();
  if (result === 'Error' || result === Infinity || result === -Infinity) {
    valueEl.innerText = 'Error';
  } else {
    addToHistory(`${previousValueStr} ${operator} ${getValueAsStr()} = ${result}`);
    valueEl.innerText = result;
  }
  operator = '';
  previousValueStr = '';
  currentValueStr = '';
});

acEl.addEventListener('click', clearDisplay);

// Clock
const updateClock = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
};

setInterval(updateClock, 1000);
updateClock();
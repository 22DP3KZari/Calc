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

// Functions
const getValueAsStr = () => valueEl.textContent.split(',').join('');

const getValueAsNum = () => {
  return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    valueEl.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.');
  if (decimalStr) {
    valueEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

// Event Listeners
acEl.addEventListener('click', () => {
  setStrAsValue('0');
});

pmEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === '-0') {
    setStrAsValue('0');
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});

percentEl.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
});

numberElArray.forEach((numberEl, index) => {
  numberEl.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '0') {
      setStrAsValue(index.toString());
    } else {
      setStrAsValue(currentValueStr + index.toString());
    }
  });
});

decimalEl.addEventListener('click', () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes('.')) {
    setStrAsValue(currentValueStr + '.');
  }
});

let operator = '';
let previousValueStr = '';

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
      newValueNum = previousValueNum / currentValueNum;
    }

    setStrAsValue(newValueNum.toString());
    operator = '';
    previousValueStr = '';
  }
};

additionEl.addEventListener('click', () => handleOperatorClick('addition'));
subtractionEl.addEventListener('click', () => handleOperatorClick('subtraction'));
multiplicationEl.addEventListener('click', () => handleOperatorClick('multiplication'));
divisionEl.addEventListener('click', () => handleOperatorClick('division'));

equalEl.addEventListener('click', () => {
  handleOperatorClick(operator);
  operator = '';
  previousValueStr = '';
});

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
const displayHis = document.querySelector('.display-1');
const displayFormula = document.querySelector('.formula');
const displayTempResult = document.querySelector('.temp-result');
const number = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const equals = document.querySelector('.equal');
const clearAll = document.querySelector('.clear-all');
const clearLast = document.querySelector('.clear-last');

let num1 = '';
let num2 = '';
let result = null;
let lastOperation = '';
let haveDot = false;

number.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    num2 += e.target.innerText;
    displayFormula.innerText = num2;
  });
});

operation.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    if (!num2) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (num1 && num2 && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(num2); // zamienia string w liczbę
    }
    clearVar(operationName); // usunięci wartości z num2 i przeniesienie do pola szarego
    lastOperation = operationName;
    console.log(result);
  });
});

function clearVar(name = '') {
  num1 += `${num2} ${name} `;
  displayHis.innerText = num1;
  displayFormula.innerText = '';
  num2 = '';
  displayTempResult.innerText = result;
}

function mathOperation() {
  if (lastOperation === 'x') {
    result = parseFloat(result) * parseFloat(num2);
  } else if (lastOperation === '+') {
    result = parseFloat(result) + parseFloat(num2);
  } else if (lastOperation === '-') {
    result = parseFloat(result) - parseFloat(num2);
  } else if (lastOperation === '/') {
    result = parseFloat(result) / parseFloat(num2);
  } else if (lastOperation === '%') {
    result = parseFloat(result) % parseFloat(num2);
  }
}

equals.addEventListener('click', (e) => {
  if (!num1 || !num2) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayFormula.innerText = result;
  displayTempResult.innerText = '';
  num2 = result;
  num2 = '';
});

clearAll.addEventListener('click', (e) => {
  num1 = '';
  num2 = '';
  result = '';
  lastOperation = '';
  haveDot = false;
  displayTempResult.innerText = '0';
  displayFormula.innerText = '0';
  displayHis.innerText = '0';
});

clearLast.addEventListener('click', (e) => {
  displayFormula.innerText = num2.slice(0, num2.length - 1);
  const remove = num2.slice(0, num2.length - 1);
  num2 = remove;

  if (!displayTempResult.innerText) {
    num1 = '';
    num2 = '';
    result = '';
    lastOperation = '';
    haveDot = false;
    displayTempResult.innerText = '0';
    displayFormula.innerText = '0';
    displayHis.innerText = '0';
  }
});

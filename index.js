// 1. functions for all of the basic math operators
function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

/* 
2. Create a new function "operate" that takes an operator 
and 2 numbers and then calls one of the above functions on the numbers.
*/
function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}

/* 
4. Create the functions that populate the display 
when you click the number buttons… 
*/

// create the selectors
let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const buttonNumber = document.querySelectorAll("button.btn");
console.log(buttonNumber)
const buttonOperator = document.querySelectorAll("button.btn-operator");
const buttonEqual = document.getElementById("Equals")
const buttonClear = document.getElementById("clear")
const buttonDelete = document.getElementById("delete")
const lastDisplay = document.getElementById("lastDisplay")
const currentDisplay = document.getElementById("currentDisplay")

// add event listeners
buttonEqual.addEventListener('click', evaluate)
buttonClear.addEventListener('click', clear)
buttonDelete.addEventListener('click', deleteNumber)


// event listener for each button
buttonNumber.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

// populate display for each button
function appendNumber(number) {
  if (currentDisplay.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentDisplay.textContent += number
}

function resetScreen() {
  currentDisplay.textContent = ''
  shouldResetScreen = false
}

buttonOperator.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function clear() {
  currentDisplay.textContent = '0'
  lastDisplay.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function deleteNumber() {
  currentDisplay.textContent = currentDisplay.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentDisplay.textContent
  currentOperation = operator
  lastDisplay.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentDisplay.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentDisplay.textContent
  currentDisplay.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  lastDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}





const display = document.getElementById("display");
let hasCalculated = false;

function appendToDisplay(input) {
  if (hasCalculated) {
    clearAll();
    hasCalculated = false;
  }
  display.value += input;
}

function clearLastCharacter() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let expression = display.value;


  expression = expression.replace(/(\d+)%/g, '($1 / 100)');

  let match;

  while ((match = expression.match(/(\d+)!/))) {
    const number = parseInt(match[1], 10);

   
    if (isNaN(number) || number < 0) {
      display.value = "Error"; 
      return;
    }


    const factorialResult = factorial(number);
    expression = expression.replace(/(\d+)!/, factorialResult);
  }

  try {
 
    display.value = eval(expression);
    hasCalculated = true; 
  } catch (error) {

    display.value = "Error";
  }
}

function factorial(n) {
  if (n < 0) {
    return "Error"; 
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function clearAll() {
  display.value = "";
}
const display=document.getElementById("display");
let hasCalculated = false;
function appendToDisplay(input){
  
  if(hasCalculated){
    clearAll();
    hasCalculated=false;
  }
  display.value+=input;
}
function clearLastCharacter(){

  display.value = display.value.slice(0, -1);
}
function calculate() {
  let expression = display.value;

  // Replace percentage expressions
  expression = expression.replace(/(\d+)%/g, '($1 / 100)');

  let match;

  // Process factorials in the expression
  while ((match = expression.match(/(\d+)!/))) {
    const number = parseInt(match[1], 10);

    // Check if the number is a valid positive integer
    if (isNaN(number) || number < 0 || !Number.isInteger(number)) {
      display.value = "Error"; 
      return;
    }

    // Calculate factorial
    const factorialResult = factorial(number);
    expression = expression.replace(/(\d+)!/, factorialResult);
  }

  try {
    // Evaluate the final expression after replacing factorials
    display.value = eval(expression);
    hasCalculated = true; // Flag indicating a calculation has occurred
  } catch (error) {
    // Handle any errors during evaluation
    display.value = "Error";
  }
}

function factorial(n) {
  if (n < 0) {
    return "Error"; // Factorial not defined for negative numbers
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
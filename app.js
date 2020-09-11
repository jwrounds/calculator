// calculator screen and button variables

const screen = document.querySelector('#text');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const evaluate = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const sqrRootButton = document.querySelector('.squareRoot');
const exponentButton = document.querySelector('.exponent');
const decimalButton = document.querySelector('#decimal');
const deleteButton = document.querySelector('#delete');

const calculations = {

  // basic calculations

  "add": function(x, y){
    return x + y;
  },
  "subtract": function(x, y){
    return x - y;
  },
  "multiply": function(x, y){
    return x * y;
  },
  "divide": function(x, y){
    return x / y;
  },
  "squareRoot": function(x){
    return Math.sqrt(x);
  }, 

  // exponential calculation

  "calculateExponent": function(x, n, i = 1, acc=x) {
    if (i < n) {
      acc *= x;
      i++;
      return calculations.calculateExponent(x, n, i, acc);
    } else {
      return acc;
    }
  }
}

// cache to hold current operands and operation for evaluation

const cache = {
  "operand-1": null,
  "operand-2": null,
  "operation": null,
  "operator": null,
  "evaluated": false
};

// calculation helper function

const operate = (operator, x, y) => {
  let val = Number.parseFloat(operator(x, y)).toFixed(6);
  return +val;
};

// reset helper function

const reset = () => {
  screen.textContent = '';
  for (let key in cache) {
    cache[key] = null;
  }
  cache['evaluated'] = false;
}

// general event listeners for number and basic operator buttons

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', e => {
    // display number clicked
    // if screen blank, set text content of screen to number clicked
    if (screen.textContent === '' && cache['operand-1'] === null) {
      screen.textContent = e.target.value;
    } else {
      // if operand or operator already present, add number clicked
      screen.textContent += e.target.value
    }   
  });
}

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', e => {
    // check to see if operand present on screen
    if ((screen.textContent !== '' && cache['operator'] === null)) {
      // set current operation in cache
      cache['operation'] = e.target.id;
      // set first operand in cache
      cache['operand-1'] = screen.textContent;
      // add operator to screen and set to cache
      screen.textContent += e.target.value;
      cache["operator"] = e.target.value;
    } 
  });
}

//specialized event listeners for squareRoot, evaluation, decimals, clear, and delete functionality

sqrRootButton.addEventListener('click', e => {
  screen.textContent = calculations.squareRoot(screen.textContent);
  cache['evaluated'] = true;
  cache['operand-1'] = screen.textContent;
});

evaluate.addEventListener('click', e => {
  // set final operand
  let operatorIndex = screen.textContent.indexOf(cache['operator']);
  cache['operand-2'] = screen.textContent.slice(operatorIndex+1, screen.textContent.length);

  // convert operands into numbers and display final calculation
  let x = +cache['operand-1'];
  let y = +cache['operand-2'];
  screen.textContent = operate(calculations[cache['operation']], x, y);

  // set 'evaluated' to true
  cache['evaluated'] = true;

  //reset operator 
  cache['operator'] = null;
});

decimalButton.addEventListener('click', e => {
  // variable to contain last calculator input
  let adjacentSymbol = screen.textContent[screen.textContent.length - 1];
  // check if last input is a number
  if (!Number.isNaN(+adjacentSymbol))  {
    // if so, allow decimal to follow
    screen.textContent += e.target.value;
    // also allow decimal if no inputs on screen (i.e. allow decimal to begin calculation using floating point number less than 1)
  } else if (screen.textContent === ''){
    screen.textContent += e.target.value;
  }
});

deleteButton.addEventListener('click', e => {

  let lastInputIndex = screen.textContent.length - 1;
  let lastInput = screen.textContent[lastInputIndex];
  
  // if last input was an operator, reset operator in cache
  if (lastInput == cache['operator']) {
    cache['operator'] = null
  }

  // remove last input
  screen.textContent = screen.textContent.slice(0, lastInputIndex);
});

clear.addEventListener('click', e => {
  reset();
});
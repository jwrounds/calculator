const screen = document.querySelector('#text');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const evaluate = document.querySelector('#equals');
const clear = document.querySelector('#clear');

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

  "calculateExponent": function(x, n, i = 1) {
    if (i < n) {
      x *= x;
      i++;
      return this.calculateExponent(x, n, i);
    } else {
      return x;
    }
  }
}

// cache to hold current operands and operation for evaluation

const cache = {
  "operand-1": null,
  "operand-2": null,
  "operation": null,
  "operator": null
};

// calculation helper function

const operate = (operator, x, y) => operator(x, y);

// reset helper function

const reset = () => {
  screen.textContent = '';
  for (let key in cache) {
    cache[key] = null;
  }
}

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', e => {
    // display number clicked
    // if screen blank, set text content of screen to number clicked
    if (screen.textContent === '' && cache['operand-1'] === null) {
      screen.textContent = e.target.value;
    } else {
      // if operand already present, add number clicked to operand
      screen.textContent += e.target.value
    }   
  });
}

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', e => {
    // check to see if operand present on screen
    if (screen.textContent !== '' && cache['operand-1'] === null) {
      // set current operation in cache
      cache['operation'] = e.target.id;
      // set first operand in cache
      cache['operand-1'] = screen.textContent;
      // add operator to screen and set to cache
      screen.textContent += e.target.textContent;
      cache["operator"] = e.target.textContent;
    }
  });
}

evaluate.addEventListener('click', e => {
  // set final operand
  let operatorIndex = screen.textContent.indexOf(cache['operator']);
  cache['operand-2'] = screen.textContent.slice(operatorIndex+1, screen.textContent.length);

  // convert operands into numbers and display final calculation
  let x = +cache['operand-1'];
  let y = +cache['operand-2'];
  screen.textContent = operate(calculations[cache['operation']], x, y);

});

clear.addEventListener('click', e => {
  reset();
});
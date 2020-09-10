// basic calculations

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const squareRoot = (x) => Math.sqrt(x);

// exponential calculation

const calculateExponent = (x, n, i = 1) => {
  if (i < n) {
    x *= x;
    i++;
    return calculateExponent(x, n, i);
  } else {
    return x;
  }
}


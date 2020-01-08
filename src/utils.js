function calculate(first, second, operator) {
  switch (operator) {
    case "*":
      return first * second;
    case "-":
      return first - second;
    case "+":
      return first + second;
    case "/":
      return first / second;
  }
}

module.exports = { calculate };

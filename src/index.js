const { calculate } = require("./utils");
const operators = ["+", "-", "*", "/"];

let selectedOperator = "";
let lastWasOperator = false;
let first = 0;
let second = 0;

function clear() {
  selectedOperator = "";
  lastWasOperator = false;
  first = 0;
  second = 0;
}

window.addEventListener("load", () => {
  clear();
  const displayInput = document.querySelector("input");

  setTimeout(() => {
    // NOTE: technical tech to tidy up later, JSDOM doesnt seem to run animations
    displayInput.classList.remove("blink");
  }, 100);
});

window.addEventListener("click", e => {
  const nodeName = e.target.nodeName.toLowerCase();
  const displayInput = document.querySelector("input");

  if (nodeName !== "button") {
    return;
  }

  const textContent = e.target.textContent;
  const value = +textContent;

  if (!isNaN(value)) {
    if (lastWasOperator) {
      displayInput.value = "";
      lastWasOperator = false;
    }
    if (!lastWasOperator && !first && !second) {
      displayInput.value = "";
    }

    if (!selectedOperator) {
      displayInput.value += value;
      first = +displayInput.value;
    } else {
      displayInput.value += value;
      second = +displayInput.value;
    }
  } else if (operators.some(op => op === textContent)) {
    selectedOperator = textContent;
    lastWasOperator = true;
    displayInput.classList.add("blink");
  } else if (textContent === "=") {
    displayInput.value = calculate(first, second, selectedOperator);
    clear();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the HTML elements
  const resultElement = document.querySelector(".result");
  const buttons = document.querySelectorAll("button");

  // Initialize the calculator state
  let currentInput = "";
  let currentOperator = "";
  let previousInput = "";
  let shouldReset = false;

  // Helper function to update the result display
  function updateResult() {
    resultElement.textContent = currentInput;
  }

  // Event listener for button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent;

      // Handle different button types
      if (buttonText === "AC") {
        // Clear all
        currentInput = "";
        previousInput = "";
        currentOperator = "";
        shouldReset = false;
      } else if (buttonText === "=") {
        // Calculate the result
        if (currentInput && previousInput && currentOperator) {
          const num1 = parseFloat(previousInput);
          const num2 = parseFloat(currentInput);

          switch (currentOperator) {
            case "+":
              currentInput = (num1 + num2).toString();
              break;
            case "-":
              currentInput = (num1 - num2).toString();
              break;
            case "*":
              currentInput = (num1 * num2).toString();
              break;
            case "/":
              if (num2 !== 0) {
                currentInput = (num1 / num2).toString();
              } else {
                currentInput = "Error";
              }
              break;
          }

          previousInput = "";
          currentOperator = "";
          shouldReset = true;
        }
      } else if (buttonText.match(/[0-9.]/)) {
        // Handle number and decimal input
        if (shouldReset) {
          currentInput = "";
          shouldReset = false;
        }
        currentInput += buttonText;
      } else {
        // Handle operator input (+, -, *, /)
        if (currentOperator && previousInput) {
          // Calculate intermediate result if an operator is already present
          const num1 = parseFloat(previousInput);
          const num2 = parseFloat(currentInput);
          switch (currentOperator) {
            case "+":
              currentInput = (num1 + num2).toString();
              break;
            case "-":
              currentInput = (num1 - num2).toString();
              break;
            case "*":
              currentInput = (num1 * num2).toString();
              break;
            case "/":
              if (num2 !== 0) {
                currentInput = (num1 / num2).toString();
              } else {
                currentInput = "Error";
              }
              break;
          }
        }
        previousInput = currentInput;
        currentInput = "";
        currentOperator = buttonText;
      }

      // Update the result display
      updateResult();
    });
  });
});

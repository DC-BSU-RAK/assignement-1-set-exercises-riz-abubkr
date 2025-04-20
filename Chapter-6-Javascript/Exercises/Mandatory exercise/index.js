// references to DOM elements
const costInput = document.getElementById('cost');
const litersInput = document.getElementById('liters');
const calculateBtn = document.getElementById('calculateButton');
const totalCostDisplay = document.getElementById('totalCost');

// Function to calculate total cost
function calculateTotal() {
  const costPerLiter = parseFloat(costInput.value);
  const liters = parseFloat(litersInput.value);

  // Validate inputs
  if (isNaN(costPerLiter) || isNaN(liters)) {
    totalCostDisplay.textContent = '⚠️ Please enter valid numbers.';
    return;
  }

  // Calculating total
  const total = costPerLiter * liters;

  // Displaying the result with 2 decimal places
  totalCostDisplay.textContent = `Total cost: د${total.toFixed(2)}`;
}

// Add click event listener to button
calculateBtn.addEventListener('click', calculateTotal);


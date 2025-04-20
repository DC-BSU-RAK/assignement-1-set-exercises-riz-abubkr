// Get references to DOM elements
const rgbText = document.querySelector('.rgb-value');
const colorOptions = document.querySelector('.color-options');
const feedback = document.querySelector('.feedback');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');

// Game state variables
let correctColor = '';
let lives = 3;
let score = 0;

/**
 * Generate a random RGB color string
 * @returns {string} rgb(r, g, b)
 */
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Start a new round of the game
 */
function newRound() {
  feedback.textContent = '';
  colorOptions.innerHTML = '';

  // Generate and display the target color
  correctColor = getRandomColor();
  rgbText.textContent = correctColor.toUpperCase();

  // Add the correct color and two random colors to the options
  let options = [correctColor];
  while (options.length < 3) {
    const color = getRandomColor();
    if (!options.includes(color)) {
      options.push(color);
    }
  }

  // Shuffle the color options
  options.sort(() => 0.5 - Math.random());

  // Display each color as a clickable box
  options.forEach(color => {
    const box = document.createElement('div');
    box.classList.add('color-box');
    box.style.backgroundColor = color;
    box.addEventListener('click', () => handleGuess(color));
    colorOptions.appendChild(box);
  });
}

/**
 * Handle the player's guess
 * @param {string} selectedColor - the color the user clicked
 */
function handleGuess(selectedColor) {
  if (selectedColor === correctColor) {
    score++;
    feedback.textContent = 'Correct!';
  } else {
    lives--;
    feedback.textContent = 'Wrong!';
  }

  updateStats();

  // If lives run out, end the game
  if (lives <= 0) {
    endGame();
  } else {
    // Start next round after a short delay
    setTimeout(newRound, 1000);
  }
}

/**
 * Update the UI with the current score and lives
 */
function updateStats() {
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
}

/**
 * End the game and show final score
 */
function endGame() {
  feedback.textContent = `Game Over! Final Score: ${score}`;
  colorOptions.innerHTML = ''; // Clear color options
  restartBtn.style.display = 'inline-block'; // Show restart button
}

/**
 * Restart the game from the beginning
 */
restartBtn.addEventListener('click', () => {
  lives = 3;
  score = 0;
  updateStats();
  restartBtn.style.display = 'none';
  newRound();
});

// Start the game
newRound();

// script.js

function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left -= 200;
    if (left >= 0) {
        character.style.left = left + "px";
    }
}

function moveRight() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    left += 200;
    if (left <= 500) {
        character.style.left = left + "px";
    }
}

function resetGame() {
    stopTimer(); // Stop the timer and display the score
    counter = 0;
    animationDuration = initialAnimationDuration;

    // Show and animate the game over text
    gameOverText.style.display = 'block';
    setTimeout(() => {
        gameOverText.style.opacity = 1;
    }, 10);

    // Display the score in the game over text
    updateScore;
    gameOverText.innerHTML = "Game Over! Your Score: " + score + " seconds";
    postplayerscore();
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
});

var block = document.getElementById("block");
var character = document.getElementById("character");
var gameOverText = document.getElementById('game-over-text');
var scoreDisplay = document.getElementById('score-display');
var counter = 0;
var initialAnimationDuration = 1000; // Initial animation duration in milliseconds
var animationDuration = initialAnimationDuration;
var startTime;
var score = 0;
var timerInterval;
var timerStarted;
var gameOverInterval;

function updateScore(){
    scoreDisplay.textContent = "Score: " + score;
}

block.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * 3);
    left = random * 200;
    block.style.left = left + "px";
    counter++;
    score++;
    updateScore();

    // Increase animation speed over time
    animationDuration *= 0.95; // You can adjust the multiplier for the speed of increase
    block.style.animationDuration = `${animationDuration / 500}s`;

    // Restart the animation
    block.style.animation = 'none';
    void block.offsetWidth; // Trigger reflow
    block.style.animation = `slide ${animationDuration / 500}s infinite`;

   updateScore;
});

function resetTimer() {
    clearInterval(timerInterval); // Clear the interval that updates the score
    startTime = 0; // Reset the start time
    timerStarted = false; // Reset the timerStarted flag
}


// Add a function to stop the timer and display the score
function stopTimer() {
    clearInterval(timerInterval); // Clear the interval that updates the score
    //var endTime = new Date();
    //var timeDifference = endTime - startTime;
    //score = Math.floor(timeDifference / 10000); // Score is the time played in seconds
    displayScore(); // Display the score
    showGameOver(); // Show the game over text and restart button
}
// Add a function to display the score
function displayScore() {
    //var endTime = new Date();
    //var timeDifference = endTime - startTime;
   // score = Math.floor(timeDifference / 1000); Score is the time played in seconds
    console.log("Your Score: " + score + " seconds");
}

var gameOverText = document.getElementById('game-over-text');

setInterval(function () {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    if (characterLeft == blockLeft && blockTop < 800 && blockTop > 600) {
        // Game over
        resetGame();
    }
}, 1);
function restartGame() {
    // Reset game-related properties
    block.style.animation = "slide 1s infinite";
    counter = 0;
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    animationDuration = initialAnimationDuration;

    // Hide the game over text (if it's visible)
    gameOverText.style.display = 'none';

    // Hide the restart button (if it's visible)
    var restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.style.display = 'none';
    }

    // Reset the timer
    resetTimer();

    // Resume the block animation
    block.style.animation = `slide ${animationDuration / 500}s infinite`;

    // Clear the interval for game over check (if it's running)
    clearInterval(gameOverInterval);
    // Start checking for game over again
    gameOverInterval = setInterval(checkGameOver, 1);
}



// Add a function to check for game over
function checkGameOver() {
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));

    // Adjust the range (you can tweak the value as needed)
    var range = 30;

    // Check if the character is within the range of the block's left position
    if (characterLeft >= blockLeft - range && characterLeft <= blockLeft + range && blockTop < 800 && blockTop > 600) {
        // Game over
        clearInterval(gameOverInterval);
        updateScore;
        displayScore;
        showGameOver();
    }
}
// Replace the existing game over logic with a function
function showGameOver() {
    // Stop the block animation
    block.style.animation = "none";

    // Show the game over text
    gameOverText.style.display = 'block';

    // Show the restart button
    document.getElementById('restart-button').style.display = 'block';
}
document.getElementById('restart-button').addEventListener('click', function () {
    restartGame();
});





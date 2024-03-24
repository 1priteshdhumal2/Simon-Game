
// Define an array of button colors
const btnColors = ["pink", "yellow", "green", "purple"];

// Select the <h3> element and the <body> element from the DOM
const h3 = document.querySelector("h3");
const body = document.querySelector("body");

// Initialize variables to keep track of the user's sequence, the game's sequence, whether the game has started, and the current level
let userSeq = [];
let gameSeq = [];
let started = false;
let level = 0;

// Add event listener for keypress to start the game
document.addEventListener("keypress", startGame);

// Function to start the game
function startGame() {
    // If the game has not started yet
    if (!started) {
        started = true; // Set started to true
        levelUp(); // Call the levelUp function to start the first level
    }
}

// Function to increase the level
function levelUp() {
    userSeq = []; // Reset the user's sequence
    level++; // Increment the level
    h3.innerText = `Level ${level}`; // Update the level display in the <h3> element
    
    // Generate a random color for the next button in the game sequence
    const randIdx = Math.floor(Math.random() * btnColors.length);
    const randColor = btnColors[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    
    // Add the random color to the game sequence
    gameSeq.push(randColor);
    
    // Flash the button corresponding to the random color
    gameFlash(randBtn);
}

// Function to flash a button
function gameFlash(btn) {
    // Add a CSS class to flash the button
    btn.classList.add("flash");
    // Remove the CSS class after a short delay
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

// Function to flash a button pressed by the user
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 300);
}

// Function to check the user's answer
function checkAns(idx) {
    // If the color pressed by the user matches the corresponding color in the game sequence
    if (userSeq[idx] === gameSeq[idx]) {
        // If the user has entered the complete sequence for the current level
        if (userSeq.length === gameSeq.length) {
            // Proceed to the next level after a short delay
            setTimeout(levelUp, 1000);
        }
    } else {
        // If the user's answer is incorrect, trigger game over
        gameOver();
    }
}

// Function to handle game over
function gameOver() {
    // Display game over message and score in the <h3> element
    h3.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
    // Flash the background color of the body
    body.style.backgroundColor = "red";
    setTimeout(() => {
        body.style.backgroundColor = "white";
    }, 150);
    
    // Reset the game
    reset();
}

// Function to handle button press by the user
function btnPress(event) {
    const btn = event.target;
    // Flash the button pressed by the user
    userFlash(btn);
    // Get the color of the button pressed by the user
    const userColor = btn.getAttribute("id");
    // Add the user's color to the user's sequence
    userSeq.push(userColor);
    // Check the user's answer
    checkAns(userSeq.length - 1);
}

// Add event listeners to all buttons with the class "btn"
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});

// Function to reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// // Initialize arrays to store user's and game's sequences of button presses
// let userSeq = [];
// let gameSeq = [];

// // Define colors for buttons
// let btns = ["pink", "yellow", "green", "purple"]; 

// // Initialize game state variables
// let started = false;
// let level = 0;

// // Select the <h3> element for displaying the current level
// let h3 = document.querySelector("h3");

// // Event listener for keypress to start the game
// document.addEventListener("keypress", function () {
//     // Check if the game has not started yet
//     if(started == false) {
//         console.log("Game is started");
//         started = true; // Set game as started
//     }
//     levelUp(); // Call function to start the game by increasing the level
// });

// // Function to flash a button during the game
// function gameFlash (btn) {
//     btn.classList.add("flash"); // Add flash effect to button
//     setTimeout( function(){
//         btn.classList.remove("flash"); // Remove flash effect after 300ms
//     }, 300);
// };

// // Function to flash a button pressed by the user
// function userFlash (btn) {
//     btn.classList.add("userflash"); // Add userflash effect to button
//     setTimeout(function(){
//         btn.classList.remove("userflash"); // Remove userflash effect after 300ms
//     }, 300);
// };

// // Function to increase the level of the game
// function levelUp() {
//     userSeq = []; // Reset user's sequence
//     level++; // Increase the level
//     h3.innerText = `Level ${level}`; // Update the level display on the webpage

//     // Generate a random color for the next button in the sequence
//     let randIdx = Math.floor(Math.random() * 4);
//     let randColor = btns[randIdx];
//     let randBtn = document.querySelector(`.${randColor}`);

//     // Add the randomly generated color to the game's sequence
//     gameSeq.push(randColor);
//     console.log(gameSeq);

//     // Flash the button corresponding to the generated color
//     gameFlash(randBtn);
// };

// // Function to check if the user's sequence matches the game's sequence
// function checkAns(idx) {
//     if(userSeq[idx] === gameSeq[idx]) { // Check if the current button press matches
//         if (userSeq.length == gameSeq.length) { // Check if user has completed the sequence
//             setTimeout(levelUp, 1000); // Proceed to the next level after a delay
//         }
//     } else { // If user's press does not match
//         // Display game over message and reset game
//         h3.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
//         document.querySelector("body").style.backgroundColor = "red"; // Change background color to indicate game over
//         setTimeout(function () {
//             document.querySelector("body").style.backgroundColor = "white"; // Reset background color
//         }, 150);

//         reset(); // Reset game state
//     }
// };

// // Function to handle button presses by the user
// function btnPress() {
//     let btn = this; // Get the button element that was pressed
//     userFlash(btn); // Flash the pressed button
//     userColor = btn.getAttribute("id"); // Get the color of the pressed button
//     userSeq.push(userColor); // Add the pressed button color to the user's sequence
//     checkAns(userSeq.length - 1); // Check if the pressed button matches the game's sequence
// };

// // Add event listeners to all buttons to handle user presses
// let allBtns = document.querySelectorAll(".btn");
// for(btn of allBtns) {
//     btn.addEventListener("click", btnPress); // Call btnPress function when a button is clicked
// };

// // Function to reset the game state
// function reset() {
//     started = false; // Set game as not started
//     gameSeq = []; // Clear game sequence
//     userSeq = []; // Clear user sequence
//     level = 0; // Reset level to 0
// }
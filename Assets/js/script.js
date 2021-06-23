// DOM targeting for content injection / removal
var stageSelector = document.querySelector(".stage");
var stageSelector2 = document.getElementById("stage2");
var highscores = document.getElementById("highscores");
var hsList = document.getElementsByClassName("hsList");
var initials = document.querySelector("input");
var qText = document.getElementById("question");
var clock = document.getElementById("time");
var del1 = document.getElementById("del1"); 
var del2 = document.getElementById("del2");
var del3 = document.getElementById("del3");

// Menu Text
var menuText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds!";

// Question Text
var questions = [
    "Commonly used data types DO NOT include:",
    "The condition in an if / else statement is enclosed within _____.",
    "Arrays in JavaScript can be used to store _____.",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];

// Answer Text
var q1Answers = [
    "Strings",
    "Booleans",
    "Alerts",
    "Numbers"
];
var q1Answer = "Alerts";

var q2Answers = [
    "Quotes",
    "Curly Brackets",
    "Parentheses",
    "Square Brackets"
];
var q2Answer = "Parentheses";

var q3Answers = [
    "Numbers and Strings",
    "Other Arrays",
    "Booleans",
    "All of the Above"
];
var q3Answer = "All of the Above";

var q4Answers = [
    "Commas",
    "Curly Brackets",
    "Quotes",
    "Parentheses"
];
var q4Answer = "Quotes";

var q5Answers = [
    "JavaScript",
    "Terminal / Bash",
    "For Loops",
    "Console.log"
];
var q5Answer = "Console.log";

// Answer and validation arrays
var answers = [q1Answers, q2Answers, q3Answers, q4Answers, q5Answers];
var answer = [q1Answer, q2Answer, q3Answer, q4Answer, q5Answer];

// System Variables
var playerResponse = [];
var position = 0;
var score = 0;
var time = 75;

// Local storage for highscore variables
// If scores already exist render them, else fill in some placeholders
if (localStorage.getItem("moniker") == null) {
    var moniker = ["Foo", "Bar"];
} else {
var moniker = JSON.parse(localStorage.getItem("moniker", ", "));
}
if (localStorage.getItem("hs") == null) {
    var hs = ["37", "14"];
} else {
var hs = JSON.parse(localStorage.getItem("hs", ", "));
}
var points = localStorage.getItem("score");



// On start of quiz - Clear menu text and begin the timer
function startClear () {
    stageSelector.removeChild(stageSelector.childNodes[3]); // Removes <p>
    stageSelector.removeChild(stageSelector.childNodes[3]); // Removes <btn>
    timer();                                                // Initiates the Timer
    renderQuestion();                                       // Initiates the game loop
}



// Countdown Timer
function timer () {
        var countdown = setInterval (function () {
            time--;                                         // Iterate -1 sec
            clock.textContent = "Time: " + time;            // Inject current time to the DOM
        if (time <= 0) {                                    // Stop condition 0 sec remaining
            clearInterval(countdown);                       // Prevent counting into negative time
        } else if (position >= questions.length) {          // Stop condition if all questions are answered
            clearInterval(countdown);                       // Prevent counting into negative timer
        }
    }, 1000);                                               // Update every 1 second
}



function clearHighscores () {
    localStorage.clear();                                   // Remove saved scores from local storage
    moniker = [];                                           // Clear variable for saved names
    hs = [];                                                // Clear variable for saved scores

    // for (i = 0; i < hs.length; i++) {                       
    //     hsList.remove();                                    // Loop deleation of <li> for each item in HS array
    // }
    window.location.assign("./index.html");              // Return to main menu
}

function viewHighscores () {
    console.log("goodbye");
    window.location.assign("./Highscores.html");
    console.log("hello"); 
    renderHighscores();
    console.log("hello");   
}

function renderHighscores () {

    window.location.assign("./highscores.html");                        // Change page to Highscores

    if (del1.parentNode !== null) {
    del1.parentNode.removeChild(del1);  // Remove <label>
    del2.parentNode.removeChild(del2);  // Remove <input>
    del3.parentNode.removeChild(del3);  // Remove <button> for Submit
    }

    // Add sorting functionality so highscores are ordered by score
    // convert moniker/hs arrays to an object of key:value pairs?

    for (i = 0; i < hs.length; i++) {                                                            // Loop to create a new <li> for each item in HS array
        highscores.innerHTML += "<li class='hsList'>" + moniker[i] + " --- " + hs[i] + "</li>";  // Generate <li> for each saved highscore
    }
}

function updateHighscore () {

    moniker.push(initials.value)                                        // Add user input to array of saved names for highscores
    localStorage.setItem("moniker", JSON.stringify(moniker, ", "));     // Convert with JSON to a string and store this value in localStorage
    hs.push(points);                                                    // Add score (remaining seconds) to array of saved highscores
    localStorage.setItem("hs", JSON.stringify(hs, ", "));               // Convert with JSON to a string and store this value in localStorage

    renderHighscores();                                                 // Call the function to render these updated values
}

function submitHighscore () {

    localStorage.setItem("score", time);                                // Save the players remaining time in localStorage

    window.location.assign("./highscores.html");                        // Change page to Highscores

    renderHighscores();                                                 // Call the function to render the highscores
}



function renderQuestion () {

    if (position >= questions.length) { // Check if player has completed all questions

        qText.innerHTML = "<h1>" + "Game Over, You got " + score + " correct! With " + time + " seconds remaining!" + "</h1><br>";
        qText.innerHTML += "<button class='button' onclick='submitHighscore(time)'>" + "Submit Highscore" + "</button>";

        return false; // Stop condition for if all questions are completed
    }

    // Core functionality, update to current question and generate buttons tied to each answer
    qText.innerHTML = "<h1>" + questions[position] + "</h1><br>";    // Update <h1> to the current question
    
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=0)'>" + answers[position][0] + "</button><br>";  // Generate button for answer index 0
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=1)'>" + answers[position][1] + "</button><br>";  // Generate button for answer index 1
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=2)'>" + answers[position][2] + "</button><br>";  // Generate button for answer index 2
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=3)'>" + answers[position][3] + "</button><br>";  // Generate button for answer index 3
}



function checkAnswer (x) {                  // Parse index of which button was pressed through <x>

    var check = answers[position][x];       // Gets value for comparison

    if (check == answer[position]) {        // Compare player choice to current question's correct answer
        score++;                            // Adds a point for a correct answer
        position++;                         // Iterates player position in the quiz to the next question
        console.log("if " + position);      // Console.log that players choice was correct
        renderQuestion();                   // Re-calls the render function with the iterated position
    } else {                                // IF player choice for current question's answer was INcorrect
        position++;                         // Iterates player position in the quiz to the next question 
        time = time - 10;                   // Deduct 10seconds from the current running timer
        console.log("else " + position);    // Console.log that players choice was INcorrect
        renderQuestion();                   // Re-calls the render function with the iterated position  
    }
}



// Create and append elements for the default/home screen
function mainMenu () {
    qText.textContent = "Coding Quiz Challange";            // Set heading text

    var node = document.createElement("p");                 // Create a <p> node
    var textnode = document.createTextNode(menuText);       // Create a text node parseing menuText
    node.appendChild(textnode);                             // Append the textnode to the node
    stageSelector.appendChild(node);                        // Append the <p> node to the stage

    var nodeBTN = document.createElement("button");         // Create a <button> node
    nodeBTN.innerHTML = ("Start Quiz");                     // Create a text node for the button
    stageSelector.appendChild(nodeBTN);                     // Append the <button> node to the stage
    nodeBTN.setAttribute("class", "button");                // Add class "button" to the button
    nodeBTN.onclick = startClear;                           // Calls the clear function when <btn> pressed
}



function init() {
    if ((window.location.href.includes("Index.html")||(window.location.href.includes("index.html"))) == true) {      // Run only when on Index.html
        mainMenu();                                                 // Call function to build elements and inject content for the starting position
    } else if (window.location.href.includes("Highscores.html") == true) {
        for (i = 0; i < hs.length; i++) {                                                            // Loop to create a new <li> for each item in HS array
            highscores.innerHTML += "<li class='hsList'>" + moniker[i] + " --- " + hs[i] + "</li>";  // Generate <li> for each saved highscore
        }
    }
}


init();
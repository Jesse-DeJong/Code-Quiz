// DOM target for content injection / removal
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

// On start of quiz - Clear menu text
function startClear () {
    stageSelector.removeChild(stageSelector.childNodes[3]); // Removes <p>
    stageSelector.removeChild(stageSelector.childNodes[3]); // Removes <btn>
    timer();                                                // Initiates the Timer
    renderQuestion();                                       // Initiates the game loop
}



// Countdown Timer
function timer () {
        var countdown = setInterval (function () {
            time--;
            clock.textContent = "Time: " + time;
        if (time <= 0) {
            clearInterval(countdown);
        } else if (position >= questions.length) {
            clearInterval(countdown);
        }
    }, 1000);
}



function clearHighscores () {
    localStorage.clear();   // Remove saved scores from local storage
    moniker = [];           // Clear variable for saved names
    hs = [];                // Clear variable for saved scores

    for (i = 0; i < hs.length; i++) {   // Loop to create a new <li> for each item in HS array
        hsList.remove();
    }
        window.location.href = "./Index.html";  // Return to main menu
}

function viewHighscores () {
    var newpage = window.location.href = "./Highscores.html";
    newpage.onload = renderHighscores();   
}

function renderHighscores () {

    if (del1.parentNode !== null) {
    del1.parentNode.removeChild(del1);  // Remove <label>
    del2.parentNode.removeChild(del2);  // Remove <input>
    del3.parentNode.removeChild(del3);  // Remove <button> Submit
    }
    // Add sorting functionality so highscores are ordered by score
    // convert moniker/hs to an object of key:value pairs?

    for (i = 0; i < hs.length; i++) {   // Loop to create a new <li> for each item in HS array
        highscores.innerHTML += "<li class='hsList'>" + moniker[i] + " --- " + hs[i] + "</li>";  // Generate <li> for each saved highscore
    }
}

function updateHighscore () {

    moniker.push(initials.value)
    localStorage.setItem("moniker", JSON.stringify(moniker, ", "));
    hs.push(points);
    localStorage.setItem("hs", JSON.stringify(hs, ", "));

    renderHighscores();
}

function submitHighscore () {

    localStorage.setItem("score", time);

    window.location.href = "./Highscores.html";

    renderHighscores();
}



function renderQuestion () {

    if (position >= questions.length) {

        qText.innerHTML = "<h1>" + "Game Over, You got " + score + " correct! With " + time + " seconds remaining!" + "</h1><br>";

        qText.innerHTML += "<button class='button' onclick='submitHighscore(time)'>" + "Submit Highscore" + "</button>";
        // position = 0;
        // score = 0;
        // playerResponse = [];
        return false;
    }

    // pagenation?

    qText.innerHTML = "<h1>" + questions[position] + "</h1><br>";    // Update to the current question
    
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=0)'>" + answers[position][0] + "</button><br>";  // Generate button for answer index 0
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=1)'>" + answers[position][1] + "</button><br>";  // Generate button for answer index 1
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=2)'>" + answers[position][2] + "</button><br>";  // Generate button for answer index 2
    qText.innerHTML += "<button class='button' onclick='checkAnswer(x=3)'>" + answers[position][3] + "</button><br>";  // Generate button for answer index 3
}



function checkAnswer (x) { // Parse index of which button was pressed through <x>

    check = answers[position][x];   // Gets value for comparison

    if (check == answer[position]) { // Compare player choice to current question correct answer
        score++;    // Adds a point for a correct answer
        position++; // Updates player position in the quiz to the next question
        console.log("if" + position);
        renderQuestion(); // Re-calls the render function with the updated position
    } else {
        position++;
        time = time - 10;
        console.log("else" + position);
        renderQuestion();
    }
}



// Creates and appends elements for the default/home screen
function mainMenu () {
    qText.textContent = "Coding Quiz Challange";    // Set heading text for homescreen

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
    if (window.location.href.includes("Index.html") == true) {
        mainMenu();
    }
}



init();
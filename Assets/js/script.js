// DOM target for content injection
var stageSelector = document.querySelector(".stage");
var clock = document.getElementById("time")

// Menu Text
var menuText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds!";

// Questions
var questions = [
    "Commonly used data types DO NOT include:",
    "The condition in an if / else statement is enclosed within _____.",
    "Arrays in JavaScript can be used to store _____.",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];

// Answers
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

var answers = [q1Answers, q2Answers, q3Answers, q4Answers, q5Answers];
var answer = [q1Answer, q2Answer, q3Answer, q4Answer, q5Answer];

// Systems
var playerResponse = [];
var position = 0;
var score = 0;
var time = 75;


// Start Quiz - Clear function
function startClear () {
    stageSelector.removeChild(stageSelector.childNodes[1]); // Removes <p>
    stageSelector.removeChild(stageSelector.childNodes[1]); // <btn now index[1] - Removes <btn>
    timer();
    renderQuestion();                                              // Starts the game loop
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



function renderQuestion () {

    if (position >= questions.length) {
        stageSelector.textContent = "Game Over, You got " + score + " correct!";
        position = 0;
        score = 0;
        playerResponse = [];
        return false;
    }

    // pagenation?

    stageSelector.textContent = questions[position];    // Display the current question
    
    stageSelector.innerHTML += "<button class='button' onclick='checkAnswer(x=0)'>" + answers[position][0] + "</button><br>";  // Generate button for answer index 0
    stageSelector.innerHTML += "<button class='button' onclick='checkAnswer(x=1)'>" + answers[position][1] + "</button><br>";  // Generate button for answer index 1
    stageSelector.innerHTML += "<button class='button' onclick='checkAnswer(x=2)'>" + answers[position][2] + "</button><br>";  // Generate button for answer index 2
    stageSelector.innerHTML += "<button class='button' onclick='checkAnswer(x=3)'>" + answers[position][3] + "</button><br>";  // Generate button for answer index 3
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
    stageSelector.textContent = "Coding Quiz Challange";    // Set heading text for homescreen

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
    mainMenu();
}



init();
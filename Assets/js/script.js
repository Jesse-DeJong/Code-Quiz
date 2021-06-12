// DOM target for content injection
var stageSelector = document.querySelector(".stage");

// Menu Text
var menuText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds!";

// Questions
var questions = [
    "Commonly used data types DO NOT include:",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
];

// Answers
var q1Answers = [
    "Strings",
    "Booleans",
    "Alerts",
    "Numbers"
];

var q2Answers = [];
var q3Answers = [];
var q4Answers = [];
var q5Answers = [];



// Render current question function
function renderQuestion () {

}



// Start Quiz - Clear function
function startClear () {
    stageSelector.removeChild(stageSelector.childNodes[1]); // Removes <p>
    stageSelector.removeChild(stageSelector.childNodes[2]); // Removes <btn>
}
// Answer Selection - Clear function
function answerClear () {

}



// Quiz runstate
function runGame () {
    for (i = 0; i < questions.length; i++) {

    }
}



// Creates and appends elements for the default/home screen
function mainMenu () {
    stageSelector.textContent = "Coding Quiz Challange";    // Set heading text for homescreen

    var node = document.createElement("p");                 // Create a <p> node
    var textnode = document.createTextNode(menuText);       // Create a text node parseing menuText
    node.appendChild(textnode);                             // Append the textnode to the node
    stageSelector.appendChild(node);                        // Append the <p> node to the stage

    var nodeBTN = document.createElement("p");              // Create a <p> node
    var textnodeBTN = document.createTextNode("Start Quiz");// Create a text node for the button
    nodeBTN.appendChild(textnodeBTN);                       // Append the textnode to the node
    stageSelector.appendChild(nodeBTN);                     // Append the <p> node to the stage
    nodeBTN.setAttribute("class", "button");                // Add class "button" to the button
}



function init() {
    mainMenu();
    //reset timer
}



// Start Quiz Button logic
    // stageSelector.childNodes[3].addEventListener("click", startClear() renderQuestion());




init();
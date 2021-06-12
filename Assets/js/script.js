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
var answers = [q1Answers, q2Answers, q3Answers, q4Answers, q5Answers];

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
    var currentQuestion = answers[i];
    stageSelector.textContent = questions[i];                       // Set heading text for current question

    var list = document.createElement("ul");                        // Create an <ul> node
    stageSelector.appendChild(list);                                // Append <ul> to the stage

    for (j = 0; j < currentQuestion.length; j++) {                  // Loop over creating <li> nodes and appending their text value from the current answers array
        var listItem = document.createElement("li");                // Create an <li> node
        var textnode = document.createTextNode(currentQuestion[j]); // Create a text node parseing 
        listItem.appendChild(textnode);                             // Append the textnode to the <li> node
        list.appendChild(listItem);                                 // Append the <li> node to the <ul>
    }
    
}



// Start Quiz - Clear function
function startClear () {
    stageSelector.removeChild(stageSelector.childNodes[1]); // Removes <p>
    stageSelector.removeChild(stageSelector.childNodes[1]); // <btn now index[1] - Removes <btn>
    runGame();                                              // Starts the game loop
}
// Answer Selection - Clear function
function answerClear () {

}



// Quiz runstate
function runGame (questions) {
    for (i = 0; i < questions.length; i++) {    // Loop over renders for <i> question
        renderQuestion (i);                  // Parse current <i> into stage renderer
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
    nodeBTN.onclick = startClear;                         // Calls the clear function when <btn> pressed
}



function init() {
    mainMenu();
    //reset timer
}



init();
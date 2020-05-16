// Variables for interacting with HTML elements in index.html
var timer = document.getElementById("timer");
var questionDisplayed = document.getElementById("question");
var startBtn = document.getElementById("start");
var answerBtn = document.getElementById("answer-choices");
var correctTxt = document.getElementById("feedback-correct");
var wrongTxt = document.getElementById("feedback-wrong");
var finalScore = document.getElementById("final-score");
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials-input");
var submitBtn = document.getElementById("submit");

// setting global variables, starting score, current question, and set answer variable
var score = 0;
var currentQuestion = -1;
var ansPicked;


// questions (remember, arrays go from left to right, and start at 1.)
var quiz = [
    {
        title: "Choose the correct HTML element for the largest heading:",
        choices: ['1.) <heading>', '2.) <h6>', '3.) <head>', '4.) <h1>'],
        answer: 3
    },
    {
        title: "Choose the correct HTML element to define italic text",
        choices: ['1.) <important>','2.) <i>','3.) <strong>','4.) <b>'],
        answer: 2
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ['1.) <scripting>', '2.) <javascript>', '3.) <js>', '4.) <script>'],
        answer: 3
    },
    {
        title: "Which CSS property controls the text size?",
        choices:["1.) font-style","2.) text-size","3.) font-size","4.) text-style"],
        answer: 3
    },
    {
        title: 'Where is the correct place to insert a JavaScript tag?',
        choices: ["1.) The <body> section",
        "2.) The <head> section",
        "3.) Both the <head> section and the <body> section are correct",
        "4.) The <footer> section"],
        answer: 3
    },
    {
        title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choices: ['1.) <script src="xxx.js">', '2.) <script name="xxx.js">', '3.) <script href="xxx.js">', '4.) <script class="xxx.js">'],
        answer: 1
    },
    {
        title: 'The external Javascript file must contain the <script> tag.',
        choices: ["1.) True", "2.) False", "3.) Not this one", "4.) ... or this one"],
        answer: 2
    },
    {
        title: 'How do you write "Hello World" in an alert box?',
        choices: ['1.) msgBox("Hello World!");', '2.) alert("Hello World!");', '3.) msg("Hello World!");', '4.) alertBox("Hello World");'],
        answer: 2
    },
    {
        title: 'How do you create a function in JavaScrpt?',
        choices: ["1.) function myFunction()", "2.) function = myFunction()", "3.) function:myFunction()", "4.) function == myFunction()"],
        answer: 1
    },
    {
        title: 'How do you call a function named "myFunction"?',
        choices: ['1.) call myFunction()', '2.) myFunction()', '3.) call function myFunction()', '4.) myFunction() = call'],
        answer: 2
    },
    {
        title: "How can you make a bulleted list?",
        choices: ["1.) <ol>","2.) <ul>","3.) <nl>","4.) <bl>"],
        answer: 2
    },
    {
        title: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choices: ['1.) if (i != 5)', '2.) if i =! 5 then', '3.) if (i <> 5)', '4.) if i <> 5'],
        answer: 1
    },
    {
        title: 'How does a WHILE loop start?',
        choices: ['1.) while i = 1 to 10', '2.) while (i <= 10)', '3.) while (i <= 10; i++)', '4.) while (i <= 10)(i++)'],
        answer: 2
    },
    {
        title: 'How does a FOR loop start?',
        choices: ['1.) for (i = 0; i <= 5)', '2.) for i = 1 to 5', '3.) for (i = 0; i <= 5; i++)', '4.) for (i <= 5; i++)'],
        answer: 3
    },
    {
        title: 'How can you add a comment in a JavaScript file?',
        choices: ['1.) <!--This is a comment-->', '2.) //This is a comment', "3.) 'This is a comment", '4.) %%This is a comment'],
        answer: 2
    },
    {
        title: "How do you select an element with id 'demo'?",
        choices:["demo",".demo","#demo","*demo"],
        answer: 3
    },
    {
        title: 'What is the correct way to write a JavaScript array?',
        choices: ['1.) var colors = "red", "green", "blue"',
        '2.) var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        '3.) var colors = (1:"red, 2:"green", 3:"blue")',
        '4.) var colors = ["red", "green", "blue"]'],
        answer: 4
    },
    {
        title: 'How do you round the number 7.25 to the nearest integer?',
        choices: ['1.) round(7.25)', '2.) Math.round(7.25)', '3.) rnd(7.25)', '4.) Math.rnd(7.25)'],
        answer: 2
    },
    {
        title: 'How do you find the number with the highest value of x and y?',
        choices: ['1.) Math.ceil(x,y)', '2.) Math.max(x,y)', '3.) ceil(x,y)', '4.) top(x,y)'],
        answer: 2
    },
    {
        title: 'What event occurs when the user clicks on an HTML element?',
        choices: ['1.) onclick', '2.) onchange', '3.) onmouseover', '4.) onmouseclick'],
        answer: 1
    },
    {
        title: 'How do you declare a JavaScript variable?',
        choices: ['1.) variable carName;', '2.) var carName;', '3.) v carName;', '4.) variable = carName;'],
        answer: 2
    },
    {
        title: 'Which operator is used to assign a value to a variable?',
        choices: ['1.) x', '2.) -', '3.) *', '4.) ='],
        answer: 4
    },
    {
        title: 'Is JavaScript case sensitive?',
        choices: ['1.) Yes', '2.) No', '3.) Potato?', '4.) Potato.'],
        answer: 1
    },
    {
        title: 'What will the following code return: Boolean(10 > 9)',
        choices: ['1.) true', '2.) false', '3.) NaN', '4.) null'],
        answer: 1
    }
];

function runQuiz() {
    // Hide start button
    startBtn.classList.add("hidden");
    // Display answer choices
    answerBtn.classList.remove("hidden");
    var question = document.getElementById("question");
    // activates startTimer, and getQuestion functions
    startTimer();
    getQuestion();
}

function getQuestion() {
    // pulls up the next question
    currentQuestion++;

    // check if there are any more questions
    // quiz ends if all questions are answered
    if (currentQuestion == quiz.length) {
        gameOver();
        return;
    }

    // clear the response from the previous question
    var responseInterval = setInterval(function () {
        correctTxt.classList.add("hidden");
        wrongTxt.classList.add("hidden");
        clearInterval(responseInterval);
    }, 1000);

    // print the current question on the screen
    question.textContent = quiz[currentQuestion].title;

    // print the answer choices on the screen
    for (var i = 0; i < 4; i++) {
        var currentAns = document.getElementsByClassName("options")[i];
        currentAns.textContent = quiz[currentQuestion].choices[i];
    }
}

answerBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // get users answer choice
    ansPicked = event.target.getAttribute("data-option");

    // get correct answer
    correctAns = quiz[currentQuestion].answer;

    // check if user chose correct answer
    if (ansPicked == correctAns) {
        correctTxt.classList.remove("hidden");
        score++;
        getQuestion();
    }
    //getQuestion function runs after an answer is given to a question
    else {
    // wrong answer result
        wrongTxt.classList.remove("hidden");
        // 4 seconds are removed from the timer in the event of a wrong answer
        timer.textContent = timer.textContent - 4;
        getQuestion();
    }
});

// function for game timer
function startTimer() {
    interval = setInterval(function () {
        var time = parseInt(timer.textContent);
        timer.textContent = time - 1;

// determines if time is up, and then runs gameOver function
        if (parseInt(timer.textContent) <= 0) {
            gameOver();
            clearInterval(interval);
        }
    }, 1000);
};

// Game over function
function gameOver() {
    // hides game elements when over and reveals initials form and final score
    timer.classList.add("hidden");
    answerBtn.classList.add("hidden");
    finalScore.classList.remove("hidden");
    initialsForm.classList.remove("hidden");

    // display game over message and final score
    question.textContent = "All done! Enter your initials to save your score.";
    finalScore.textContent = "Final score: " + score;

    // save score to local storage
    localStorage.setItem("score", score);
}

// Runs the runQuiz function 
startBtn.addEventListener("click", function (event) {
    event.preventDefault;
    runQuiz();
});

// Function to submit form for saving scores
// stores initials entered in index.html in highscores.html
submitBtn.addEventListener("click", function (event) {
// preventDefault insures that the initial input doesn't disappear when entered due to page reset.
    event.preventDefault;
    var initials = initialsInput.value;
    localStorage.setItem("initials", initials);
    window.location.href("highscores.html");
})
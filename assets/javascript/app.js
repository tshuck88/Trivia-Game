$(document).ready(function () {

    // array of question objects
    var questionList = [
        {
            question: "Which is the only NFL team to go a whole season undefeated, including the Super Bowl?",
            answers: ["1972 Miami Dolphins", "1985 Chicago Bears", "2007 New England Patriots", "2013 Seattle Seahawks"],
            correct: "1972 Miami Dolphins",
            gif: "assets/images/miami-dolphins.gif"
        },
        {
            question: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
            answers: ["10", "1", "6", "3"],
            correct: "6",
            gif: "assets/images/michael-jordan.gif"
        },
        {
            question: "Which is the only team to play in every soccer World Cup tournament?",
            answers: ["Spain", "Brazil", "USA", "Portugal"],
            correct: "Brazil",
            gif: "assets/images/brazil.gif"
        },
        {
            question: "Which NFL team won the first two Super Bowls (in 1967 and 1968)?",
            answers: ["Dallas Cowboys", "Greenbay Packers", "Pittsburgh Steelers", "Seattle Seahawks"],
            correct: "Greenbay Packers",
            gif: "assets/images/green-bay-packers.gif"
        },
        {
            question: "Who is the NBA's all-time leading scorer?",
            answers: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Kareem Abdul-Jabbar"],
            correct: "Kareem Abdul-Jabbar",
            gif: "assets/images/kareem-abdul-jabbar.gif"
        },
        {
            question: "Who is the MLB's all-time leader in home runs?",
            answers: ["Barry Bonds", "Babe Ruth", "Mike Trout", "Alex Rodriguez"],
            correct: "Barry Bonds",
            gif: "assets/images/barry-bonds.gif"
        },
        {
            question: "Who is the NFL's all-time leader in touchdown passes?",
            answers: ["Brett Favre", "Tom Brady", "Aaron Rodgers", "Peyton Manning"],
            correct: "Peyton Manning",
            gif: "assets/images/peyton-manning.gif"
        },
        {
            question: "Which NFL team has the most Super Bowl wins?",
            answers: ["Seattle Seahawks", "San Francisco 49ers", "New England Patriots", "Oakland Raiders"],
            correct: "New England Patriots",
            gif: "assets/images/new-england-patriots.gif"
        }
    ];

    // global variables
    var questionListCopy = questionList.slice(0); // sets a copy of the original question list that will not be mutated
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var unAnswered;
    var timeRemaining;
    var intervalId;

    // function to choose a new question
    function chooseNewQuestion() {
        var index = Math.floor(Math.random() * questionList.length); // creates a random number between 0 and the length of questionList, stores it as an index variable
        currentQuestion = questionList[index]; // uses the index variable just created to set the current question from questionList
        questionList.splice(index, 1); // removes the chosen question from questionList so it cannot be chosen again
        startTime();
        clearText();
        displayNewQuestion();
    };

    // function to begin/reset the game
    function initializeGame() {
        questionList = questionListCopy.slice(0); // resets questionList to the unmutated questionListCopy
        timeRemaining = 30; 
        correctAnswer = 0;
        incorrectAnswer = 0;
        unAnswered = 0;
        chooseNewQuestion();
    };

    // function to start time
    function startTime() {
        timeRemaining = 30;
        intervalId = setInterval(function () { // runs the follow code by the interval amount of 1 second
            timeRemaining--; // decreases time
            $("#time-text").text("Time Remaining: " + timeRemaining + " seconds"); // updates time remaining game text
            if (timeRemaining < 0) { // if time remaining reaches 0 
                stopTime();
                unAnswered++; // increases unanswered count by 1
                clearText();
                $("#question-text").html("<h2>Out of Time!</h2>"); // tells the user they ran out of time
                $("#answer-a").html("<h2>The correct answer was " + currentQuestion.correct + "</h2>"); // displays correct answer
                $("#answer-d").html('<img src="' + currentQuestion.gif + '" width="auto" height="200px">') // displays correct answer gif
                isGameOver(); // calls function to check if the game is over
            }
        }, 1000)
    };
    
    //function to stop time
    function stopTime() {
        clearInterval(intervalId);
    };

    // function to update game text and display new question and answers
    function displayNewQuestion() {
        $("#time-text").text("Time Remaining: " + timeRemaining + " seconds");
        $("#question-text").text(currentQuestion.question);
        $("#answer-a").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-a-text"></button>');
        $("#answer-a-text").text(currentQuestion.answers[0]);
        $("#answer-b").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-b-text"></button>');
        $("#answer-b-text").text(currentQuestion.answers[1]);
        $("#answer-c").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-c-text"></button>');
        $("#answer-c-text").text(currentQuestion.answers[2]);
        $("#answer-d").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-d-text"></button>');
        $("#answer-d-text").text(currentQuestion.answers[3]);
    };

    // function to clear all game text
    function clearText() {
        $("#finished-text").text("");
        $("#correct-text").text("");
        $("#incorrect-text").text("");
        $("#unanswered-text").text("");
        $("#question-text").text("");
        $("#answer-a").text("");
        $("#answer-b").text("");
        $("#answer-c").text("");
        $("#answer-d").text("");
    };

    // function for when the game is over
    function gameOver() {
        clearText();
        $("#finished-text").text("All done, here's how you did:");
        $("#correct-text").text("Correct Answers: " + correctAnswer);
        $("#incorrect-text").text("Incorrect Answers: " + incorrectAnswer);
        $("#unanswered-text").text("Unanswered: " + unAnswered);
        $("#start-button").show().text("Start Over?");
    };
    
    // function to check if the game is over
    function isGameOver(){
        if(correctAnswer + incorrectAnswer + unAnswered === questionListCopy.length) { // if the amount of user answers is equal to amount of possible questions
            setTimeout(gameOver, 5000) // then the game is over, runs the game over function after 5 seconds
        } else {
            setTimeout(chooseNewQuestion, 5000); // if not, then chooses a new question after 5 seconds
        }
    };

    // function to start the game and hide the start button on start button click
    $(document).on("click", "#start-button", function () {
        initializeGame();
        $("#start-button").hide();
    });

    // function to respond to the users choice
    $(document).on("click", ".answer-button", function () {
        if ($(this).text() === currentQuestion.correct) { // if button the user clicks on matches the correct answer of the current question
            stopTime(); 
            correctAnswer++; // increase correct answers count by 1
            clearText();
            $("#question-text").html("<h2>Correct!</h2>"); // tells user they are correct
            $("#answer-d").html('<img src="' + currentQuestion.gif + '" width="auto" height="200px">') // displays correct answer gif
            isGameOver(); // calls function to check if the game is over
        } else { // if the user choice is not correct
            stopTime();
            incorrectAnswer++; // increase incorrect answers count by 1
            clearText();
            $("#question-text").html("<h2>Nope!</h2>"); // tells user they are incorrect
            $("#answer-a").html("<h2>The correct answer was " + currentQuestion.correct + "</h2>"); // displays correct answer
            $("#answer-d").html('<img src="' + currentQuestion.gif + '" width="auto" height="200px">') // displays correct answer gif
            isGameOver(); // calls function to check if the game is over
        }
    });
});
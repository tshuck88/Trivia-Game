$(document).ready(function () {

    var questionList = [
        {
            text: "Which is the only NFL team to go a whole season undefeated, including the Super Bowl?",
            answers: ["1972 Miami Dolphins", "1985 Chicago Bears", "2007 New England Patriots", "2013 Seattle Seahawks"],
            correct: "1972 Miami Dolphins"
        },
        {
            text: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
            answers: ["10", "1", "6", "3"],
            correct: "6"
        },
        {
            text: "Which is the only team to play in every soccer World Cup tournament?",
            answers: ["Spain", "Brazil", "USA", "Portugal"],
            correct: "Brazil"
        },
        {
            text: "Which NFL team won the first two Super Bowls (in 1967 and 1968)?",
            answers: ["Dallas Cowboys", "Greenbay Packers", "Pittsburgh Steelers", "Seattle Seahawks"],
            correct: "Greenbay Packers"
        },
        {
            text: "Who is the NBA's all-time leading scorer?",
            answers: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Kareem Abdul-Jabbar"],
            correct: "Kareem Abdul-Jabbar"
        },
        {
            text: "Who is the MLB's all-time leader in home runs?",
            answers: ["Barry Bonds", "Babe Ruth", "Mike Trout", "Alex Rodriguez"],
            correct: "Barry Bonds"
        },
        {
            text: "Who is the NFL's all-time leader in touchdown passes?",
            answers: ["Brett Favre", "Tom Brady", "Aaron Rodgers", "Peyton Manning"],
            correct: "Peyton Manning"
        },
        {
            text: "Which NFL team has the most Super Bowl wins?",
            answers: ["Seattle Seahawks", "San Francisco 49ers", "New England Patriots", "Oakland Raiders"],
            correct: "New England Patriots"
        }
    ];

    var questionListCopy = questionList.slice(0);
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var unAnswered;
    var timeRemaining;
    var clockRunning = false;
    var gameReset;
    var gameOver;
    
    function chooseNewQuestion() {
        var index = Math.floor(Math.random() * questionList.length)
        currentQuestion = questionList[index];
        questionList.splice(index, 1);
        displayNewQuestion()
    };

    function initializeGame() {
        questionListCopy
        questionList = questionListCopy.slice(0)
        timeRemaining = 30;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unAnswered = 0;
        clockRunning = true;
        chooseNewQuestion();
    };

    function displayNewQuestion() {
        $("#time-text").text("Time Remaining: " + timeRemaining + " seconds");
        $("#question-text").text(currentQuestion.text);
        $("#answer-a").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-a-text"></button>');
        $("#answer-a-text").text(currentQuestion.answers[0]);
        $("#answer-b").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-b-text"></button>');
        $("#answer-b-text").text(currentQuestion.answers[1]);
        $("#answer-c").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-c-text"></button>');
        $("#answer-c-text").text(currentQuestion.answers[2]);
        $("#answer-d").html('<button type="button" class="btn btn-warning btn-lg answer-button" id="answer-d-text"></button>');
        $("#answer-d-text").text(currentQuestion.answers[3]);
    };

    function resetText(){
        $("#answer-a").text("");
        $("#answer-b").text("");
        $("#answer-c").text("");
        $("#answer-d").text("");
    }

    function displayCorrectAnswer(){

    }

    $(document).on("click", "#start-button", function () {
        initializeGame();
        $("#start-button").hide();    
    });

    $(document).on("click", ".answer-button", function() {
        if($(this).text() === currentQuestion.correct){
            correctAnswer++;
            $("#question-text").html("<h2>Correct!</h2>");
            resetText();
        } else {
            incorrectAnswer++;
            $("#question-text").html("<h2>Nope!</h2>");
            resetText();
            $("#answer-a").html("<h2>The correct answer was " + currentQuestion.correct + "</h2>");
        }
    });
});
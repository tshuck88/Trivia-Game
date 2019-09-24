$(document).ready(function () {

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

    var questionListCopy = questionList.slice(0);
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var unAnswered;
    var timeRemaining;
    var clockRunning = false;
    var intervalId;

    function chooseNewQuestion() {
        var index = Math.floor(Math.random() * questionList.length)
        currentQuestion = questionList[index];
        questionList.splice(index, 1);
        clearText();
        displayNewQuestion();
        startTime();
    };

    function initializeGame() {
        questionList = questionListCopy.slice(0)
        timeRemaining = 30;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unAnswered = 0;
        chooseNewQuestion();
    };

    function startTime() {
        if (!clockRunning) {
            timeRemaining = 30;
            intervalId = setInterval(function () {
                $("#time-text").text("Time Remaining: " + timeRemaining + " seconds");
                timeRemaining--;
                if (timeRemaining < 0) {
                    stopTime();
                    unAnswered++;
                    clearText();
                    $("#question-text").html("<h2>Out of Time!</h2>");
                    $("#answer-a").html("<h2>The correct answer was " + currentQuestion.correct + "</h2>");
                    if (correctAnswer + incorrectAnswer + unAnswered === questionListCopy.length) {
                        setTimeout(gameOver, 1000)
                    } else {
                        setTimeout(chooseNewQuestion, 1000);
                    }
                }
            }, 1000)
            clockRunning = true;
        }
    };

    function stopTime() {
        clearInterval(intervalId)
        clockRunning = false;
    };

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

    function clearText() {
        $("#finished-text").text("")
        $("#correct-text").text("")
        $("#incorrect-text").text("")
        $("#unanswered-text").text("")
        $("#question-text").text("")
        $("#answer-a").text("");
        $("#answer-b").text("");
        $("#answer-c").text("");
        $("#answer-d").text("");
    };

    function gameOver() {
        clearText();
        $("#finished-text").text("All done, here's how you did:");
        $("#correct-text").text("Correct Answers: " + correctAnswer);
        $("#incorrect-text").text("Incorrect Answers: " + incorrectAnswer);
        $("#unanswered-text").text("Unanswered: " + unAnswered);
        $("#start-button").show().text("Start Over?");
    }

    $(document).on("click", "#start-button", function () {
        initializeGame();
        $("#start-button").hide();
    });

    $(document).on("click", ".answer-button", function () {
        if ($(this).text() === currentQuestion.correct) {
            stopTime();
            correctAnswer++;
            clearText();
            $("#question-text").html("<h2>Correct!</h2>");
            $("#answer-d").html('<img src="' + currentQuestion.gif + '" width="auto" height="200px">')
            if (correctAnswer + incorrectAnswer + unAnswered === questionListCopy.length) {
                setTimeout(gameOver, 1000)
            } else {
                setTimeout(chooseNewQuestion, 1000);
            }
        } else {
            stopTime();
            incorrectAnswer++;
            clearText();
            $("#question-text").html("<h2>Nope!</h2>");
            $("#answer-a").html("<h2>The correct answer was " + currentQuestion.correct + "</h2>");
            $("#answer-d").html('<img src="' + currentQuestion.gif + '" width="auto" height="200px">')
            if (correctAnswer + incorrectAnswer + unAnswered === questionListCopy.length) {
                setTimeout(gameOver, 1000)
            } else {
                setTimeout(chooseNewQuestion, 1000);
            }
        }
    });
});
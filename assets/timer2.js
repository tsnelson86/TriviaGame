//Array that assigns all questions, answers, and assets.
var questions = [
		{"name": "question1",
		"ask": "What was the name of Bran's Direwold?",
		"guess1" : "Ghost", 
		"guess2": "Long Claw", 
		"guess3": "Summer",
		"guess4": "Shaggy Dog",
		"image" : "assets/images/summer.jpg",
		"answer": "Summer"
	},
	{ "name" : "question2",
		"ask": "Which of these are not a God in Westeros?",
		"guess1": "The Many Faced God", 
		"guess2": "The Blessed God", 
		"guess3": "The Lord of Light",
		"guess4": "The Drowned God",
		"image" : "assets/images/gods2.jpg",
		"answer": "The Blessed God"
	},
	{ "name" : "question3",
		"ask": "How many Kingsguards are there?",
		"guess1": "4", 
		"guess2": "5", 
		"guess3": "6",
		"guess4": "7",
		"image" : "assets/images/kingsguard.jpg",
		"answer": "7"
	},
	{ "name" : "question4",
		"ask": "Who was 'The Red Viper?'",
		"guess1": "Oberyn Martell", 
		"guess2": "Trystane Martell", 
		"guess3": "Ellaria Sands",
		"guess4": "Prince Doran Martell",
		"image" : "assets/images/viper.jpg",
		"answer": "Oberyn Martell"
	},
	{ "name" : "question5",
		"ask": "What is on the sigil of House Tully?",
		"guess1": "A Red Sun", 
		"guess2": "A Blackfish", 
		"guess3": "A Trout",
		"guess4": "A Falcon",
		"image" : "assets/images/tully.jpeg",
		"answer": "A Trout"
	},
	{ "name" : "question6",
		"ask": "Which of the following is not a kingdom of Westeros?",
		"guess1": "The Vale", 
		"guess2": "Essos", 
		"guess3": "The Reach",
		"guess4": "The Stormlands",
		"image" : "assets/images/kingdoms.jpg",
		"answer": "Essos"
	},
	{ "name" : "question7",
		"ask": "Which is not one of The Seven?",
		"guess1": "The Crone", 
		"guess2": "The Assassin", 
		"guess3": "The Mother",
		"guess4": "The Smith",
		"image" : "assets/images/gods.jpg",
		"answer": "The Assassin"
	},
	{ "name" : "question8",
		"ask": "What is the name of Daenerys' green dragon?",
		"guess1":"Drogon", 
		"guess2": "Rhaegal", 
		"guess3": "Viserion",
		"guess4": "Vhagar",
		"image" : "assets/images/dragon.jpg",
		"answer": "Rhaegal"
	},
	 {"name" : "question9",
		"ask": "Which city in Essos didn't get conquered by Danaerys?",
		"guess1": "Bravos", 
		"guess2": "Meereen", 
		"guess3": "Astapor",
		"guess4": "Yunkai",
		"image" : "assets/images/bravos.png",
		"answer": "Bravos"
	},
	{ "name" : "question10",
		"ask": "Who was not a part of Robert Baratheon's Small Council?",
		"guess1": "Renly Baratheon", 
		"guess2": "Jon Arryn", 
		"guess3": "Hoster Tully",
		"guess4": "Barristan Selmy",
		"image" : "assets/images/Hoster_Tully.png",
		"answer": "Hoster Tully"
	}
];

//Defining variables used in the game.
var timer = 30;
var correctAnswers = 0;
var wrongAnswers = 0;
var noAnswers = 0;
var intervalId = 0;
var correctAnswer = "";
var questionCounter = 0;

//Calls starting screen function to create the start button.
startingScreen();

//If start button is pressed, populates with first question and starts timer.
$("#startButton").click(function(){
	nextQuestion();
	timerFun();
});

//Collects user's guess and references answer for a given question - displays proper response.
$(".guess").click(function(e){
	if ($(this).text() == correctAnswer) {
		clearInterval(intervalId);
		correctAnswerFun();
	}
	else if ($(this).text() != correctAnswer) {
		clearInterval(intervalId);
		wrongAnswerFun();
	}
});

//Starting screen hides the game div and shows the start button div.
function startingScreen () {
	$("#gameSectionDiv").hide();
	$("#startButtonDiv").show();
}

//Function controlling the timer.
//Beginning at 30 seconds, decrements by 1 until an answer is given or timer reaches 0.
//If timer reaches 0 calls the outoftime function.
//Always displays up-to-date time.
function timerFun (){
	$("#timeRemaining").text(timer);
	intervalId = setInterval(decrement, 1000);
	function decrement() {
	  if (timer === 0) {
	    clearInterval(intervalId);
	    outOfTimeFun();
	  }
	  else if (timer > 0) {
	  	timer--;
	  }
	  $("#timeRemaining").text(timer);
	}
}

//Function increments question counter by 1 and restarts the timer.
//If all questions have been asked, calls end game function.
function pause () {
	if (questionCounter < 9){
		questionCounter++;
		timer = 30;
		nextQuestion();
		timerFun();
	}
	else {
		endGameFun();
	}
}

//Hides unneeded divs and shows proper divs for the next question.
//Shows next question with appropriate answers and logs correct answer for use in click function.
function nextQuestion () {
	$("#startButtonDiv").hide();
	$("#endGame-pane").hide();
	$("#correctGuess-pane").hide();
	$("#wrongGuess-pane").hide();
	$("#gameSectionDiv").show();
	$("#guessOptions-pane").show();
	$("#userMessage").text(questions[questionCounter].ask);
	$("#guess1").text(questions[questionCounter].guess1);
	$("#guess2").text(questions[questionCounter].guess2);
	$("#guess3").text(questions[questionCounter].guess3);
	$("#guess4").text(questions[questionCounter].guess4);
	correctAnswer = questions[questionCounter].answer;
}

//If answer was marked correct, updates the Dom, increments correct guesses by 1, and calls pause function.
function correctAnswerFun () {
	$("#guessOptions-pane").hide();
	$("#correctGuess-pane").show();
	$("#correctGuessImgDiv").html("<img class='answerImg' src='" + questions[questionCounter].image + "' />");
	$("#userMessage").text("Correct!");
	setTimeout(pause, 3000);
	correctAnswers++;
}

//If answer was marked correct, updates the Dom, increments incorrect guesses by 1, and calls pause function.
function wrongAnswerFun () {
	$("#guessOptions-pane").hide();
	$("#wrongGuess-pane").show();
	$("#correctAnswer").text(questions[questionCounter].answer);
	$("#wrongGuessImgDiv").html("<img class='answerImg' src='" + questions[questionCounter].image + "' />");
	setTimeout(pause, 3000);
	wrongAnswers++;
}

//If answer was not given in time, updates the Dom, increments no guesses by 1, and calls pause function.
function outOfTimeFun () {
	$("#guessOptions-pane").hide();
	$("#wrongGuess-pane").show();
	$("#userMessage").text("You ran out of time.");
	$("#correctAnswer").text(questions[questionCounter].answer);
		$("#wrongGuessImgDiv").html("<img class='answerImg' src='" + questions[questionCounter].image + "' />");
	setTimeout(pause, 3000);
	noAnswers++;
}

//Function that hides/shows the proper divs.
//Also contains onclick function to reset game variables and restart the game.
function endGameFun() {
	$("#startButtonDiv").hide();
	$("#guessOptions-pane").hide();
	$("#correctGuess-pane").hide();
	$("#wrongGuess-pane").hide();
	$("#gameSectionDiv").show();
	$("#endGame-pane").show();
	$("#correctGuesses").text(correctAnswers);
	$("#wrongGuesses").text(wrongAnswers);
	$("#unansweredGuesses").text(noAnswers);
	$("#startOver").click(function(){
		correctAnswers = 0;
		wrongAnswers = 0;
		noAnswers = 0;
		questionCounter = 0;
		timer = 30;
		nextQuestion();
		timerFun();
	});
}
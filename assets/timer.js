var questions = [
		{"name": "question1",
		"ask": "What was the name of Bran's Direwold?",
		"guess1" : "Ghost", 
		"guess2": "Long Claw", 
		"guess3": "Summer",
		"guess4": "Shaggy Dog",
		"answer": "Summer"
	},
	{ "name" : "question2",
		"ask": "Which of these are not a God in Westeros?",
		"guess1": "The Many Faced God", 
		"guess2": "The Blessed God", 
		"guess3": "The Lord of Light",
		"guess4": "The Drowned God",
		"answer": "The Bledssed God"
	},
	{ "name" : "question3",
		"ask": "How many Kingsguards are there?",
		"guess1": "4", 
		"guess2": "5", 
		"guess3": "6",
		"guess4": "7",
		"answer": "7"
	},
	{ "name" : "question4",
		"ask": "Who was 'The Red Viper?'",
		"guess1": "Oberyn Martell", 
		"guess2": "Trystane Martell", 
		"guess3": "Ellaria Sands",
		"guess4": "Prince Doran Martell",
		"answer": "Oberyn Martell"
	},
	{ "name" : "question5",
		"ask": "What is on the sigil of House Tully?",
		"guess1": "A Red Sun", 
		"guess2": "A Blackfish", 
		"guess3": "A Trout",
		"guess4": "A Falcon",
		"answer": "A Trout"
	},
	{ "name" : "question6",
		"ask": "Which of the following is not a kingdom of Westeros?",
		"guess1": "The Vale", 
		"guess2": "Essos", 
		"guess3": "The Reach",
		"guess4": "The Stormlands",
		"answer": "Essos"
	},
	{ "name" : "question7",
		"ask": "Which is not one of The Seven?",
		"guess1": "The Crone", 
		"guess2": "The Assassin", 
		"guess3": "The Mother",
		"guess4": "The Smith",
		"answer": "The Assassin"
	},
	{ "name" : "question8",
		"ask": "What is the name of Daenerys' green dragon?",
		"guess1":"Drogon", 
		"guess2": "Rhaegal", 
		"guess3": "Viserion",
		"guess4": "Vhagar",
		"answer": "Rhaegal"
	},
	 {"name" : "question9",
		"ask": "Which city in Essos didn't get conquered by Danaerys?",
		"guess1": "Bravos", 
		"guess2": "Meereen", 
		"guess3": "Astapor",
		"guess4": "Yunkai",
		"answer": "Bravos"
	},
	{ "name" : "question10",
		"ask": "Who is not a part of Robert Baratheon's Small Council?",
		"guess1": "Renly Baratheon", 
		"guess2": "Jon Arryn", 
		"guess3": "Hoster Tully",
		"guess4": "Barristan Selmy",
		"answer": "Hoster Tully"
	}
];

var gameState = "new";
var timer = 30;
var timerIndicator = "off";
var judgement = "";
var correctAnswers = 0;
var wrongAnswers = 0;
var noAnswers = 0;
var intervalId = 0;
var correctAnswer = "";
var answered = "no";
var questionCounter = 0;

gameStep();

$("#startButton").click(function(){
	gameState = "playing";
	timerIndicator = "running";
	gameStep();
});

function gameStep () {
	if (gameState == "new"){
		$("#gameSectionDiv").hide();
		$("#startButtonDiv").show();
		correctAnswers = 0;
		wrongAnswers = 0;
		noAnswers = 0;
		timerIndicator = "off";
	}
	else if (gameState == "playing"){
		timerFun();
		for (var i = 0; i < (Object.keys(questions).length+1); i++) {
			answered = "no";
			$("#userMessage").text(questions[i].ask);
			$("#guess1").text(questions[i].guess1);
			$("#guess2").text(questions[i].guess2);
			$("#guess3").text(questions[i].guess3);
			$("#guess4").text(questions[i].guess4);
			correctAnswer = questions[i].answer;
			$(".guess").click(function(e){
				answered = "yes";
				if ($(this).text() == correctAnswer) {
					judgement = "correct";
					timerIndicator = "paused";
					clearInterval(timer);
				}
				else {
					judgemnet = "wrong";
					timerIndicator = "paused";
					clearInterval(timer);
				}
			});
			if (timerIndicator == "running"){
				gameRunningFun();
			}
			else if (timerIndicator == "paused" && judgement == "correct") {
				correctAnswerFun();
			}
			else if (timerIndicator == "paused" && judgement == "wrong") {
				wrongAnswerFun();
			}
			else if (timerIndicator == "0") {
				outOfTimeFun();
			}
			else {}
		}
	}
	else {
		endGameFun();
	}
}

function endGameFun() {
	$("#startButtonDiv").hide();
	$("#guessOptions-pane").hide();
	$("#correctGuess-pane").hide();
	$("#wrongGuess-pane").hide();
	$("#gameSectionDiv").show();
	$("#endGame-pane").show();
	timerIndicator = "off";
	$("#startOver").click(function(){
		correctAnswers = 0;
		wrongAnswers = 0;
		noAnswers = 0;
		questionCounter = 0;
		timer = 30;
		judgement = "";
		timerIndicator = "running";
		gameState = "playing";
		gameStep();
	});
}

function pause () {
	if (questionCounter < 7){
		questionCounter++;
		gameRunningFun();
		timer = 30;
		timerFun();
	}
	else {
		endGameFun();
	}
}

function timerFun (){
	intervalId = setInterval(decrement, 1000);
	timer = 30;
	$("#timeRemaining").text(timer);
}

function gameRunningFun () {
	$("#startButtonDiv").hide();
	$("#endGame-pane").hide();
	$("#gameSectionDiv").show();
	$("#guessOptions-pane").show();
}

function correctAnswerFun () {
	$("#guessOptions-pane").hide();
	$("#correctGuess-pane").show();
	setTimeout(wait, 4000);
	correctAnswers++;
}

function outOfTimeFun () {
	$("#guessOptions-pane").hide();
	$("#wrongGuess-pane").show();
	$("#userMessage").text("You ran out of time.");
	setTimeout(wait, 4000);
	noAnswers++;
}

function wrongAnswerFun () {
	$("#guessOptions-pane").hide();
	$("#wrongGuess-pane").show();
	setTimeout(wait, 4000);
	wrongAnswers++;
}

function decrement() {
  if (timer === 0) {
    clearInterval(intervalId);
    timerIndicator = "0";
    outOfTimeFun();
  }
  else if (timer > 0) {
  	timer--;
  	timerIndicator = "running";
  }
  $("#timeRemaining").text(timer);
}

// Declaration of variables
var startButton = document.querySelector("#start");

var questionWrapper = document.querySelector("#questions");

var submitButton = document.querySelector("#submit");

var score = document.querySelector("#final-score");

var choicesList = document.querySelectorAll("#choices button span");

var timer = 60;

var questionIndex = 0;

var timerInterval = null;

// Function to stop quiz
function stopQuiz() {
  clearInterval(timerInterval);

  questionWrapper.className = "hide";

  var endScreenWrapper = document.querySelector("#end-screen");

  endScreenWrapper.className = "start";

  score.innerHTML = timer;
}

// Function to get high score
function getHighscore() {
  return JSON.parse(localStorage.getItem("high-score")) || {};
}

// Function to sort highscores in descending order
function sortHighscore(obj) {
  var sortedArray = Object.entries(obj).sort((a, b) => b[1] - a[1]);

  var sortedObject = Object.fromEntries(sortedArray);

  return sortedObject;
}

// Submit score and reset quiz
function scoreSubmitted() {
  var initials = document.querySelector("#initials").value;

  var highscore = getHighscore();

  highscore[initials] = score.innerHTML;

  var sortedHighscore = sortHighscore(highscore);

  localStorage.setItem("high-score", JSON.stringify(sortedHighscore));

  window.location.reload();
}

function playSound(filePath) {
  document.querySelector("#sound").innerHTML =
    '<embed src="' +
    filePath +
    '" hidden="true" autostart="true" loop="false"/>';
}

// Function to check if answer is correct

function isCorrect(event) {
  var questionItem = questions[questionIndex];

  var isCorrect = questionItem.isCorrect;

  var clickedButton = event.target.innerHTML;

  if (clickedButton !== isCorrect) {
    playSound("./assets/sfx/incorrect.wav");

    if (timer < 10) {
      timer = 0;

      updateTimer(timer);
    } else {
      timer -= 10;

      updateTimer(timer);
    }
  } else {
    playSound("./assets/sfx/correct.wav");
    console.log("correct");
  }

  if (questionIndex == 4) {
    stopQuiz();
  } else {
    questionIndex++;

    userAnswered();
  }
}

// Function to loop through questions
function userAnswered() {
  if (questionIndex < 5 && timer > 0) {
    var questionTitle = document.querySelector("#question-title");

    var question = questions[questionIndex];

    questionTitle.innerHTML = question.title;

    var questionOptions = question.options;

    for (index in questionOptions) {
      var choice = choicesList[index];

      choice.innerHTML = questionOptions[index];
    }
  }
}

// Function to update timer

function updateTimer(timerValue) {
  document.querySelector("#time").innerHTML = timerValue;

  if (timerValue == 0) stopQuiz();
}

// Timer function
function startTimer() {
  if (timer < 0) {
    timer = 0;
  } else {
    timer--;
  }

  updateTimer(timer);
}

// Trigger when start button is clicked
function quizStarted() {
  var startScreenWrapper = document.querySelector("#start-screen");

  startScreenWrapper.className = "hide";

  questionWrapper.className = "start";

  userAnswered();

  document.querySelector("#time").innerHTML = timer;

  timerInterval = setInterval(startTimer, 1000);
}

//Event listeners

for (choice of choicesList) choice.addEventListener("click", isCorrect);

// Start button event listener
startButton.addEventListener("click", quizStarted);

// Score submission event listener
submitButton.addEventListener("click", scoreSubmitted);

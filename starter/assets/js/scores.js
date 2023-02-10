// get highscore
function getHighScore() {
  var highscore = JSON.parse(localStorage.getItem("high-score")) || {};

  var highscorelist = document.querySelector("#highscores");

  highscorelist.innerHTML = "";

  for (prop in highscore) {
    var li = document.createElement("li");

    li.innerHTML = `${prop}: ${highscore[prop]}`;

    highscorelist.appendChild(li);
  }
}

function init() {
  var clearHighscore = document.querySelector("#clear");

  getHighScore();

  clearHighscore.addEventListener("click", clearHistory);
}

init();

// clear highscore history

function clearHistory() {
  localStorage.removeItem("high-score");

  getHighScore();
}

// variables retrive elements from highscores.html
var showScores = document.getElementById("show-scores");
var newRecord = document.createElement("h5");

// Get score and initials from local storage
var newScore = localStorage.getItem("score");
var newName = localStorage.getItem("initials");

newRecord.textContent = newName + " : " + newScore;

showScores.appendChild(newRecord);
// variables retrive elements from highscores.html
var showScores = document.getElementById("show-scores");
// creates h5 for score presentation
var newRecord = document.createElement("h5");

// .getItem retrieves scores and initials from local storage
var newScore = localStorage.getItem("score");
var newName = localStorage.getItem("initials");

newRecord.textContent = newName + " : " + newScore;

showScores.appendChild(newRecord);
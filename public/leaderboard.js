var highscores = JSON.parse(localStorage.getItem("highscores"));
var scorelistol = document.getElementById("scoring");

for (let index = 0; index < highscores.length; index++) {
    var newli = document.createElement("li")
    newli.textContent=highscores[index].initals+" - " + highscores[index].score
    scorelistol.appendChild(newli)
}

function clearHighscores () {
    localStorage.clear ();
    location.reload ();
}

var clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", clearHighscores);


function saveScores () {
    var initals = initalsEl.value.toUpperCase ();
    if (initals === "") {
        alert("Blank input not allowed");
        return;
    }
    else if (initals.length > 3){
        alert("Input has to be less than 10 characters");
        return; 
    }

    // get saved scores from localstorage, or if not any, set to empty array
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];
    // format new score object for current user
    console.log({initals, time})
    var newestScores = {
      initals: initals,
      score: time
    };
    highscores.push(newestScores);
    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    location.href = "leaderboard.html";
  }


function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
    if(event.keyCode === 13)
      saveHighscore();
}

// user clicks button to submit initials
submitBtn.onclick = saveScores;
startBtn.onclick = startQuiz;




// startBtn.addEventListener("click", startQuiz) 
// initalsEl.onkeyup = checkForEnter;

const game = () => {
  let pScore = 0;
  let cScore = 0;
  const playerScore = document.querySelector(".player-score p");
  const computerScore = document.querySelector(".computer-score p");
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas)

  //Start the Game
  const startGame = async () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    // Pull scores between user and computer
    const response = await fetch('/game/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const {userWins, computerWins} = await response.json();

      // Set score from request from past games
      pScore = userWins;
      playerScore.innerHTML = userWins;
      cScore = computerWins;
      computerScore.innerHTML = computerWins;
    } else {
      alert(response.statusText);
    }

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");


    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(async() => {
          //Here is where we call compare hands
          await compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./rps2/assets/${this.textContent}.png`;
          computerHand.src = `./rps2/assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = async (results) => {
    
    const response = await fetch('/game/save', {
      method: 'POST',
      body: JSON.stringify({ results }),
      headers: { 'Content-Type': 'application/json' },
    });
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = async(playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    //player choice is 1 = rock, player choice 2 = paper, player choice 3 = scissors
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        confetti();
        pScore++;
        await updateScore({outcome: 1, player_choice: 1, computer_choice: 3 });
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        await updateScore({outcome: 2, player_choice: 1, computer_choice: 2 });
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        await updateScore({outcome: 2, player_choice: 2, computer_choice: 3 });
        return;
      } else {
        winner.textContent = "Player Wins";
        confetti();
        pScore++;
        await updateScore({outcome: 1, player_choice: 2, computer_choice: 1 });
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        await updateScore({outcome: 2, player_choice: 3, computer_choice: 1 });
        return;
      } else {
        winner.textContent = "Player Wins";
        confetti();
        pScore++;
        await updateScore({outcome: 1, player_choice: 3, computer_choice: 2 });
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
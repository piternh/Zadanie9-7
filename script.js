var newGameButton = document.getElementById('js-newGameButton');
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//listeners

newGameButton.addEventListener('click', newGame);

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//game objects

var gameState = 'notStarted',  //started //ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// SET THE BOARD

function setGameElements() {

  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        break;
    case 'ended':
        newGameButton.innerText = 'Play again';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        break;
    case 'notStarted':
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
        break;
  }

}

setGameElements();

// BEGIN OF NEW GAME

function newGame() {

  player.name = prompt('Please enter your name', 'your name');

  if (player.name != "") {

      player.score = 0;
      computer.score = 0;

      // points update in html based on js
      setGamePoints();

      gameState = 'started';
      setGameElements();

      playerNameElem.innerHTML = player.name;
  }

}

// UPDATE OF POINTS IN HTML

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// LOSOWANIE WYBORU KOMPUTERA

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}


// SET PLAYERS PICK

function playerPick(playerPick) {

    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);

    checkWinner();
}

// GAME

function checkRoundWinner(playerPick, computerPick) {

  playerResultElem.innerHTML = "";
  computerResultElem.innerHTML = "";

    if (playerPick == computerPick) {

    } else if ((computerPick == 'rock' &&  playerPick == 'scissors') || (computerPick == 'scissors' &&  playerPick == 'paper') || (computerPick == 'paper' &&  playerPick == 'rock')) {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        setGamePoints();
    } else {
        playerResultElem.innerHTML = "Win!";
        player.score++;
        setGamePoints();
    }

}

// CHECK WINNER

function checkWinner() {

  // determine max points
  var winningScore = 10;

  if (player.score == winningScore) {
    setTimeout(function() {
      alert('The winner is ' + player.name + "!")},100);
    gameState = "ended";
    setGameElements();
  }
  else if(computer.score == winningScore) {
    setTimeout(function() {
      alert('The winner is computer!')}, 100);
    gameState = "ended";
    setGameElements();
  }
}

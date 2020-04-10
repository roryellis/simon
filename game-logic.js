//TARGETS
const playButton = document.querySelector('.play-button');
const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const currentScore = document.querySelector('.current-score-value');
const topScore = document.querySelector('.top-score-value');
const difficultyLevel = document.querySelector('.difficulty-level');
const difficultyButton = document.querySelector('.set-difficulty-button');

//LISTENERS
playButton.addEventListener('click', startSequence);
gameBoard.addEventListener('click', playerInput);
gameBoard.addEventListener('click', buttonPressLight);
resetButton.addEventListener('click', reset);
difficultyButton.addEventListener('click', cycleDifficulty);


//Declare moves array.
let moves = [];

//declare difficulty level
let difficulty = 1;
difficultyLevel.innerText = difficulty;
setGameSpeed();

//game generates a random move
//generate random number 1-4, push to array
function addNewMove() {
	moves.push(Math.ceil(Math.random() * 4));
}

//Modal with instructions and "Ready to play?" button.
//Start Sequence:
function startSequence() {
	reset();
	//HIDE MODAL

	//lightShow
	setTimeout(() => {
		lightShow();
	}, cycleSpeed * 4);
	// set first move
	addNewMove();
	// demo first move
	setTimeout(() => {
		demonstrate(moves);
	}, cycleSpeed * 60);
}

//player inputs moves
//declare array for player moves
let playerMoves = [];
//declare starting player score
let playerScore = 0;
currentScore.innerText = playerScore;
let topScoreValue = 0;
topScore.innerText = topScoreValue;

//on button click(propagation on game board)

function playerInput(event) {
	if (event.target.classList.contains('game-button')) {
		//get ID number of button, push id to array, toggle light on off
		getButtonId(event);
		//check player moves correct
		if (checkPlayerMoves()) {
			//if correct,wait for next input
			//if playermoves.length = moves.length
			if (playerMoves.length === moves.length) {
				//increment player score
				incrementScore();
				//add new required move
				addNewMove();
				//reset player moves
				playerMoves = [];
				//demonstrate move array
				setTimeout(() => {
					demonstrate(moves);
				}, cycleSpeed * 16);
			}
		} else {
			//FAIL SEQUENCE
			flickerAll();
			setTimeout(() => {
				flickerAll();
			}, cycleSpeed * 8);
		}
	}
}

function getButtonId(event) {
	const buttonId = parseInt(event.target.id);
	playerMoves.push(buttonId);
	//NEED WORK ON BUTTON PRESS LIGHT TIMING
	buttonPressLight(buttonId);
}

function checkPlayerMoves() {
	const moveChecks = [];
	for (i = 0; i < playerMoves.length; i++) {
		if (playerMoves[i] === moves[i]) {
			moveChecks.push(true);
		} else {
			moveChecks.push(false);
		}
	}
	return moveChecks.every(isTrue);
}

function isTrue(item) {
	if (item) {
		return true;
	}
	return false;
}


//increment current score
function incrementScore() {
    playerScore += 1;
    currentScore.innerText = playerScore;
    if (playerScore > topScoreValue) {
        topScoreValue = playerScore;
        topScore.innerText = topScoreValue;
    }
};

//reset button

function reset() {
    flickerAll();
	moves = [];
	playerMoves = [];
	playerScore = 0;
	currentScore.innerText = playerScore;
}


//Cycle Difficulty level

function cycleDifficulty() {
    if (difficulty < 4) {
        difficulty++;
    } else {
        difficulty = 1;
    };
    difficultyLevel.innerText = difficulty;
    setGameSpeed();
};

function setGameSpeed() {
    const speedOptions = [500, 250, 125, 62.5];
    gameSpeed = speedOptions[difficulty - 1];
}

//time limit for input?

//if incorrect: game over modal
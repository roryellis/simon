//TARGETS
const playButton = document.querySelector('.play-button');
const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const currentScore = document.querySelector('.current-score-value');
const topScore = document.querySelector('.top-score-value');
const difficultyLevel = document.querySelector('.difficulty-level');
const difficultyButton = document.querySelector('.set-difficulty-button');
const gameMode = document.querySelector('.game-mode');
const gameModeButton = document.querySelector('.game-mode-button');

//LISTENERS
playButton.addEventListener('click', startSequence);
gameBoard.addEventListener('click', playerInput);
gameBoard.addEventListener('click', buttonPressLight);
resetButton.addEventListener('click', reset);
difficultyButton.addEventListener('click', cycleDifficulty);
gameModeButton.addEventListener('click', cycleGameMode);

//Declare moves array.
let moves = [];
let reverseMoves = [];

//declare difficulty level
let difficulty = 1;
difficultyLevel.innerText = difficulty;
setGameSpeed();

//Declare game mode
let gameModeValue = 'standard';
gameMode.innerText = gameModeValue.toUpperCase();

//game generates a random move
//generate random number 1-4, push to array
function addNewMove() {
	let newMove = Math.ceil(Math.random() * 4);
	moves.push(newMove);
	reverseMoves.unshift(newMove);
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
		demoSequence();
	}, cycleSpeed * 60);
}

//countdown used for decrementing lit timer segments and as score multiplier
let countDownValue = 10;
let timer;

function timerCountdown(start) {
	// debugger;
	if (start) {
		if (countDownValue <= 0) {
			return (countDownValue = 10);
		} else {
			timer = setTimeout(() => {
				timerSegments[countDownValue - 1].classList.remove('red-lit');
				countDownValue--;
				timerCountdown(start);
			}, gameSpeed * (moves.length / 2));
		}
	} else {
		clearTimeout(timer);
		countDownValue = 10;
	}
}

//function to execute move demonstration and delayed timer countdown
function demoSequence() {
	demonstrate(moves);
	setTimeout(() => {
		//fill timer bar
		lightTimer();
		timerCountdown(true);
	}, gameSpeed * (moves.length * 2));
}

//player inputs moves
//declare array for player moves
let playerMoves = [];
//declare starting player score
let playerScore = 0;
currentScore.innerText = playerScore;
let topScoreValue = parseInt(localStorage.getItem('topScore'), 10) || 0;
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
				//stop timerCountdown
				timerCountdown(false);
				//add new required move
				addNewMove();
				//reset player moves
				playerMoves = [];
				//demonstrate move array
				setTimeout(() => {
					demoSequence();
				}, gameSpeed * 3);
			}
		} else {
			//FAIL SEQUENCE
			//stop timerCountdown
			timerCountdown(false);
			flickerAll();
			setTimeout(() => {
				flickerAll();
			}, cycleSpeed * 8);
		}
	}
}

function failSequence() {
	//stop timerCountdown
	timerCountdown(false);
	//flicker lights
	flickerAll();
	setTimeout(() => {
		flickerAll();
	}, cycleSpeed * 8);
}

function getButtonId(event) {
	const buttonId = parseInt(event.target.id);
	playerMoves.push(buttonId);
	buttonPressLight(buttonId);
}

function checkPlayerMoves() {
	const moveChecks = [];
	if (gameModeValue === 'reverse') {
		for (i = 0; i < playerMoves.length; i++) {
			if (playerMoves[i] === reverseMoves[i]) {
				moveChecks.push(true);
			} else {
				moveChecks.push(false);
			}
		}
		return moveChecks.every(isTrue);
	} else {
		for (i = 0; i < playerMoves.length; i++) {
			if (playerMoves[i] === moves[i]) {
				moveChecks.push(true);
			} else {
				moveChecks.push(false);
			}
		}
		return moveChecks.every(isTrue);
	}
}

function isTrue(item) {
	if (item) {
		return true;
	}
	return false;
}

//increment current score
function incrementScore() {
	playerScore += countDownValue;
	currentScore.innerText = playerScore;
	if (playerScore > topScoreValue) {
		//LOCAL TOP SCORE STORAGE
		//reference stackoverflow solutions https://stackoverflow.com/questions/16245536/setting-a-variable-in-local-storage/16245717#16245717
		topScoreValue = playerScore;
		localStorage.setItem('topScore', topScoreValue);
		topScore.innerText = topScoreValue;
	}
}

//reset button
function reset() {
    timerCountdown(false);
    unlightTimer();
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
	}
	difficultyLevel.innerText = difficulty;
	setGameSpeed();
}

function setGameSpeed() {
	const speedOptions = [500, 250, 125, 62.5];
	gameSpeed = speedOptions[difficulty - 1];
}

function cycleGameMode() {
	const modeOptions = ['standard', 'reverse'];
	const currentModeIndex = modeOptions.indexOf(`${gameModeValue}`);
	if (currentModeIndex === 1) {
		gameModeValue = modeOptions[0];
	} else {
		gameModeValue = modeOptions[currentModeIndex + 1];
	}
	gameMode.innerText = gameModeValue.toUpperCase();
}

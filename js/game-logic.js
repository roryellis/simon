//TARGETS
const startButton = document.querySelector('.play-button');
const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const currentScore = document.querySelector('.current-score-value');
const topScore = document.querySelector('.top-score-value');
const difficultyLevel = document.querySelector('.difficulty-level');
const difficultyButton = document.querySelector('.set-difficulty-button');
const gameMode = document.querySelector('.game-mode');
const gameModeButton = document.querySelector('.game-mode-button');

//LISTENERS
startButton.addEventListener('click', startSequence);
gameBoard.addEventListener('click', playerInput);
resetButton.addEventListener('click', reset);
difficultyButton.addEventListener('click', cycleDifficulty);
gameModeButton.addEventListener('click', cycleGameMode);

//declare variable to set if the game is open to accept input. Used in playerInput function.
let acceptInput = false;

//Gamespeed variable to set time delay in milliseconds between lit state toggle. Will adjust by difficulty level in setGameSpeed function.
let gameSpeed;

function setGameSpeed() {
	//declare gameSpeed delay for each difficulty level
	const speedOptions = [450, 350, 250, 150];
	//assign gamespeed to value in array index corresponding to difficulty level
	gameSpeed = speedOptions[difficulty - 1];
}

//declare difficulty level
let difficulty = 1;
//update difficulty display
difficultyLevel.innerText = difficulty;
//set game speed delay according to difficulty value
setGameSpeed();

//Declare game mode variable
let gameModeValue = 'standard';
//Update game mode display
gameMode.innerText = gameModeValue.toUpperCase();

//Declare moves arrays for each game mode.
let moves = [];
let reverseMoves = [];

//game generates a random move
//generate random number 0-3, push to array
function addNewMove() {
	let newMove = Math.floor(Math.random() * 4);
	moves.push(newMove);
	reverseMoves.unshift(newMove);
}

//Start Sequence:
function startSequence() {
	reset();
	//lightShow. Delay allows for reset sequence flicker to complete
	setTimeout(() => {
		lightShow();
	}, cycleSpeed * 6);
	// set first move
	addNewMove();
	// demo first move. Delay allows for distinction between light show and moves demonstration.
	setTimeout(() => {
		demoSequence();
	}, cycleSpeed * 60);
}

//countdown used for decrementing lit timer segments and as score multiplier
let countDownValue = 10;
let timer;
//Recursive function takes boolean argument allowing it to serve as a start/stop functionality
function timerCountdown(start) {
	//if argument is true
	if (start) {
		//Base case. Countdown reaches zero. Countdown is reset, acceptInput set to false, return.
		if (countDownValue <= 0) {
			countDownValue = 10;
			acceptInput = false;
			return;
		}
		//if countdown is not zero
		else {
			//assign setTimeout function to variable
			timer = setTimeout(() => {
				//target timerSegments array item one less than countdown value to toggle red-lit state to black.
				timerSegments[countDownValue - 1].classList.remove('red-lit');
				//decrement countdown value
				countDownValue--;
				//recall the function
				timerCountdown(start);
				//Delay increases with number of moves
			}, gameSpeed * (moves.length / 2));
		}
	}
	//If argument is false
	else {
		//Clear timeout to stop countdown
		clearTimeout(timer);
		//reset countdown value to 10 for next round
		countDownValue = 10;
	}
}

//Execute move demonstration and delayed timer countdown
function demoSequence() {
	demonstrate(moves);
	setTimeout(() => {
		//open for input
		acceptInput = true;
		//fill timer bar
		lightTimer();
		//start countdown
		timerCountdown(true);
		//Set timeout to double the number of moves multiplied be the gameSpeed to allow the demonstration to complete before starting timer.
	}, gameSpeed * (moves.length * 2));
}

//player inputs moves
//declare array for player moves
let playerMoves = [];
//declare starting player score
let playerScore = 0;
//update score display
currentScore.innerText = playerScore;
//Get local value for topScore OR set topScore to zero
let topScoreValue = parseInt(localStorage.getItem('topScore'), 10) || 0;
//update topScore display
topScore.innerText = topScoreValue;

//on button click(propagation on game board)
function playerInput(event) {
	//If event is a game-button press
	if (event.target.classList.contains('game-button')) {
		//If acceptInput is true(game is ready for input)
		if (acceptInput) {
			//get ID number of button, push id to playerMoves array, play sound, toggle lit state on/off
			getButtonId(event);
			//check playerMoves against the moves array.
			if (checkPlayerMoves()) {
				//if correct, check playerMoves array length. If not equal, wait for next input
				//if playerMoves.length = moves.length
				if (playerMoves.length === moves.length) {
					//stop accepting input
					acceptInput = false;
					//increment player score
					incrementScore();
					//stop and reset timerCountdown
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
				failSequence();
			}
		}
	}
}

function failSequence() {
	//stop accepting input
	acceptInput = false;
	//stop and reset timerCountdown
	timerCountdown(false);
	//flicker lights twice
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
	//Declare variable array for set of boolean values
	const moveChecks = [];
	//If game mode is reverse compare to reverseMoves array
	if (gameModeValue === 'reverse') {
		//for loop cycles through each item in playerMoves array
		for (i = 0; i < playerMoves.length; i++) {
			//compare playerMoves item with reverseMoves item in corresponding index
			if (playerMoves[i] === reverseMoves[i]) {
				//if moves match, push true value to moveChecks array
				moveChecks.push(true);
			} else {
				//if moves do not match, push false value to moveChecks array
				moveChecks.push(false);
			}
		}
		//Return boolean value if all moves were correct or not.
		return moveChecks.every(isTrue);
	}
	//If game mode is standard compare to moves array
	else {
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

//callback function for .every() method in checkMoves
function isTrue(item) {
	if (item) {
		return true;
	}
	return false;
}

//increment current score
function incrementScore() {
	//add countdown value multiplied by difficulty to playerScore
	playerScore += countDownValue * difficulty;
	//update score display
	currentScore.innerText = playerScore;
	//If score is greater than top score.
	if (playerScore > topScoreValue) {
		//set sopScoreValue
		topScoreValue = playerScore;
		//Store topScore locally for future recall
		localStorage.setItem('topScore', topScoreValue);
		//update topScore display
		topScore.innerText = topScoreValue;
	}
}

function reset() {
	//stop and reset timerCountdown
	timerCountdown(false);
	//clear timerSegment lit states
	unlightTimer();
	//flicker lights
	flickerAll();
	//clear moves arrays
	moves = [];
	reverseMoves = [];
	playerMoves = [];
	//clear current score value and display
	playerScore = 0;
	currentScore.innerText = playerScore;
}

//Cycle Difficulty level
function cycleDifficulty() {
	//If difficulty is less than four, increment
	if (difficulty < 4) {
		difficulty++;
	}
	//if difficulty is already four, set to one.
	else {
		difficulty = 1;
	}
	//update difficulty display
	difficultyLevel.innerText = difficulty;
	//set gameSpeed value
	setGameSpeed();
}

function cycleGameMode() {
	//declare game mode options
	const modeOptions = ['standard', 'reverse'];
	//get index of current mode in array
	const currentModeIndex = modeOptions.indexOf(`${gameModeValue}`);
	//if in reverse mode, change game mode to standard
	if (currentModeIndex === 1) {
		gameModeValue = modeOptions[0];
	}
	//if game mode standard, change to reverse
	else {
		gameModeValue = modeOptions[currentModeIndex + 1];
	}
	//update game mode display
	gameMode.innerText = gameModeValue.toUpperCase();
}

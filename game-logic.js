//TARGETS
const playButton = document.querySelector('.play-button');
const gameBoard = document.querySelector('.game-board');
const resetButton = document.querySelector('.reset-button');
const currentScore = document.querySelector('.current-score-value');
const topScore = document.querySelector('.top-score-value');

//LISTENERS
playButton.addEventListener('click', startSequence);
gameBoard.addEventListener('click', playerInput);
gameBoard.addEventListener('click', buttonPressLight);

//Declare moves array.
let moves = [];
//game generates a random move
//generate random number 1-4, push to array
function addNewMove() {
    moves.push(Math.ceil(Math.random() * 4));
    console.log('new move added')
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
	}, cycleSpeed * 52);
}

//player inputs moves
//declare array for player moves
let playerMoves = [];
//declare starting player score
let playerScore = 0;
currentScore.innerText = playerScore;

//on button click(propagation on game board), get ID number of button
//push id to array, toggle light on off, WHILE playermoves less than moves
//wait for next input. if playermoves = moves, check correct input

function playerInput(event) {
    if (event.target.classList.contains('game-button')) {
        getButtonId(event);
        console.log('checking player moves')
        if (checkPlayerMoves()) {
            console.log('player moves correct')
            if (playerMoves.length === moves.length) {
                console.log('round won, next round')
                //increment player score
                incrementScore();
                addNewMove();
                //reset player moves
                playerMoves = [];
                console.log('player moves reset')
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
};

function getButtonId(event) {
	const buttonId = parseInt(event.target.id);
    playerMoves.push(buttonId);
    console.log('new move registered')
	//NEED WORK ON BUTTON PRESS LIGHT TIMING
	buttonPressLight(buttonId);
}

function checkPlayerMoves() {
    const moveChecks = [];
    for (i = 0;i < playerMoves.length; i++) {
        if (playerMoves[i] === moves[i]) {
            moveChecks.push(true);
        } else {
            moveChecks.push(false);
        }
    }
    return moveChecks.every(isTrue);
}

function isTrue (item) {
    if(item) {
        return true;
    }
    return false;
}

//time limit for input?

//if correct: light cycle, increment number of moves, increment level counter, add a move to array

//if incorrect: game over modal

//increment current score
function incrementScore() {
    playerScore += 1;
    currentScore.innerText = playerScore;
};

//reset button

function reset() {
	flickerAll();
	moves = [];
    playerMoves = [];
    playerScore = 0;
    currentScore.innerText = playerScore;
}

//TARGETS
const playButton = document.querySelector('.play-button');
const gameBoard = document.querySelector('.game-board');

//LISTENERS
playButton.addEventListener('click', startSequence);
gameBoard.addEventListener('click', playerInput);
gameBoard.addEventListener('click', buttonPressLight);


//Declare moves array.
const moves = [];
//game generates a random move
//generate random number 1-4, push to array
function addNewMove() {
	moves.push(Math.ceil(Math.random() * 4));
}

//Modal with instructions and "Ready to play?" button.
//Start Sequence:
function startSequence() {
	//HIDE MODAL

	//lightShow
	lightShow();
	// set first move
	addNewMove();
	// demo first move
	setTimeout(() => {
		demonstrate(moves);
	}, cycleSpeed * 44);
}



//player inputs moves
//declare array for player moves
let playerMoves = [];
//on button click(propagation on game board), get ID number of button
//push id to array, toggle light on off, WHILE playermoves less than moves
//wait for next input. if playermoves = moves, check correct input

function playerInput(event) {
    if (playerMoves.length < moves.length) {
        if(event.target.classList.contains('game-button')) {
            getButtonId(event);
            console.log(playerMoves);
        }
    };
    if (playerMoves.length === moves.length) {
        //check player input
        checkPlayerMoves();
    }
};

function getButtonId(event) {
    const buttonId = parseInt(event.target.id);
    playerMoves.push(buttonId);
    //NEED WORK ON BUTTON PRESS LIGHT TIMING
    buttonPressLight(buttonId);
};

function checkPlayerMoves() {
    console.log('moves: ', JSON.stringify(moves));
    console.log('playerMoves: ', JSON.stringify(playerMoves));
    if (JSON.stringify(playerMoves) == JSON.stringify(moves)) {
        //NEXT SEQUENCE
        lightCycle();
        addNewMove();
        playerMoves = [];
        setTimeout(() => {
            demonstrate(moves);
        },cycleSpeed * 16);
    } else {
        //FAIL SEQUENCE
        console.log('fail')
        //RESET FUNCTION
    }
}

//time limit for input?


//if correct: light cycle, increment number of moves, increment level counter, add a move to array

//if incorrect: game over modal

//reset button

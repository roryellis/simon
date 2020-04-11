//Target all game buttons
const gameButtons = document.querySelectorAll('game-button');

//Target individual game buttons
const greenButton = document.querySelector('.green');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const blueButton = document.querySelector('.blue');

//target timer bar
const timerBar = document.querySelector('.timer-bar');
const timerSegments = document.querySelectorAll('.timer-segment');

//Set time delay in milliseconds for lit state toggle. Will adjust by difficulty level.
let gameSpeed = 500;

//Set time delay in milliseconds for light cycle and flicker
const cycleSpeed = 50;

//Function to cycle lit states.
function lightCycle() {
	toggleGreenLit();
	greenNoise.play();
	setTimeout(() => {
		toggleGreenLit();
		setTimeout(() => {
			toggleRedLit();
			redNoise.play();
			setTimeout(() => {
				toggleRedLit();
				setTimeout(() => {
					toggleBlueLit();
					blueNoise.play();
					setTimeout(() => {
						toggleBlueLit();
						setTimeout(() => {
							toggleYellowLit();
							yellowNoise.play();
							setTimeout(() => {
								toggleYellowLit();
							}, cycleSpeed);
						}, cycleSpeed);
					}, cycleSpeed);
				}, cycleSpeed);
			}, cycleSpeed);
		}, cycleSpeed);
	}, cycleSpeed);
}

function flickerAll() {
	toggleGreenLit();
	toggleRedLit();
	toggleBlueLit();
	toggleYellowLit();
	setTimeout(() => {
		toggleGreenLit();
		toggleRedLit();
		toggleBlueLit();
		toggleYellowLit();
	}, cycleSpeed * 4);
}

//Perform light show for startup and level win

function lightShow() {
	lightCycle();
	setTimeout(() => {
		lightCycle();
		setTimeout(() => {
			lightCycle();
			setTimeout(() => {
				flickerAll();
				setTimeout(() => {
					flickerAll();
				}, cycleSpeed * 8);
			}, cycleSpeed * 8);
		}, cycleSpeed * 8);
	}, cycleSpeed * 8);
}

//declare sound variables
let greenNoise = new Audio();
greenNoise.src = 'sounds/simonSound1.mp3';

let redNoise = new Audio();
redNoise.src = 'sounds/simonSound2.mp3';

let yellowNoise = new Audio();
yellowNoise.src = 'sounds/simonSound3.mp3';

let blueNoise = new Audio();
blueNoise.src = 'sounds/simonSound4.mp3';

function toggleGreenLit() {
	greenButton.classList.toggle('green-lit');
}

function toggleRedLit() {
	redButton.classList.toggle('red-lit');
}

function toggleYellowLit() {
	yellowButton.classList.toggle('yellow-lit');
}

function toggleBlueLit() {
	blueButton.classList.toggle('blue-lit');
}

//demonstrate moves
let moveIndex = 0;
//demonstrate is passed the moves array, consisting of button ids
function demonstrate(arr) {
	//base case ends recursive function and returns moveindex to zero
	if (moveIndex > arr.length) {
		return (moveIndex = 0);
		//check array[moveIndex] value and toggle lit state on corresponding game-button
	} else if (arr[moveIndex] === 1) {
		toggleGreenLit();
		greenNoise.play();
		setTimeout(() => {
			toggleGreenLit();
		}, gameSpeed);
	} else if (arr[moveIndex] === 2) {
		toggleRedLit();
		redNoise.play();
		setTimeout(() => {
			toggleRedLit();
		}, gameSpeed);
	} else if (arr[moveIndex] === 3) {
		toggleYellowLit();
		yellowNoise.play();
		setTimeout(() => {
			toggleYellowLit();
		}, gameSpeed);
	} else if (arr[moveIndex] === 4) {
		toggleBlueLit();
		blueNoise.play();
		setTimeout(() => {
			toggleBlueLit();
		}, gameSpeed);
	}
	//increment moveIndex
	moveIndex += 1;
	//delay recursion by gamespeed * 2 to allow lit state toggle to complete
	setTimeout(() => {
		demonstrate(arr);
	}, gameSpeed * 2);
}

//toggle lit state on pressed button
function buttonPressLight(buttonId) {
	if (buttonId === 1) {
		toggleGreenLit();
		greenNoise.play();
		setTimeout(() => {
			toggleGreenLit();
		}, gameSpeed * 0.5);
	} else if (buttonId === 2) {
		toggleRedLit();
		redNoise.play();
		setTimeout(() => {
			toggleRedLit();
		}, gameSpeed * 0.5);
	} else if (buttonId === 3) {
		toggleYellowLit();
		yellowNoise.play();
		setTimeout(() => {
			toggleYellowLit();
		}, gameSpeed * 0.5);
	} else if (buttonId === 4) {
		toggleBlueLit();
		blueNoise.play();
		setTimeout(() => {
			toggleBlueLit();
		}, gameSpeed * 0.5);
	}
}


//initiate full timer bar
function lightTimer() {
	timerSegments.forEach((segment) => {
		segment.classList.add('red-lit');
	});
}

//clear timer bar
function unlightTimer() {
	timerSegments.forEach((segment) => {
		segment.classList.remove('red-lit');
	});
}
//Target all game buttons
const gameButtons = document.querySelectorAll('game-button');

//Target individual game buttons
const greenButton = document.querySelector('.green');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const blueButton = document.querySelector('.blue');

//Set time delay in milliseconds for lit state toggle. Will adjust by difficulty level.
let gameSpeed = 250;

//Set time delay in milliseconds for light cycle and flicker
const cycleSpeed = 50;

//Function to cycle lit states.
function lightCycle() {
	toggleGreenLit();
	setTimeout(() => {
		toggleGreenLit();
		setTimeout(() => {
			toggleRedLit();
			setTimeout(() => {
				toggleRedLit();
				setTimeout(() => {
					toggleBlueLit();
					setTimeout(() => {
						toggleBlueLit();
						setTimeout(() => {
							toggleYellowLit();
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

//Toggle lit state by button
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

function demonstrate(arr) {
	if (moveIndex > arr.length) {
		return (moveIndex = 0);
	} else if (arr[moveIndex] === 1) {
		toggleGreenLit();
		setTimeout(() => {
			toggleGreenLit();
		}, gameSpeed);
	} else if (arr[moveIndex] === 2) {
		toggleRedLit();
		setTimeout(() => {
			toggleRedLit();
		}, gameSpeed);
	} else if (arr[moveIndex] === 3) {
		toggleYellowLit();
		setTimeout(() => {
			toggleYellowLit();
		}, gameSpeed);
	} else if (arr[moveIndex] === 4) {
		toggleBlueLit();
		setTimeout(() => {
			toggleBlueLit();
		}, gameSpeed);
	}
	moveIndex += 1;
	setTimeout(() => {
		demonstrate(arr);
	}, gameSpeed * 2);
};

function buttonPressLight(buttonId) {
	if (buttonId === 1) {
		toggleGreenLit();
		setTimeout(() => {
			toggleGreenLit();
		}, gameSpeed * 0.5)
	} else if (buttonId === 2) {
		toggleRedLit();
		setTimeout(() => {
			toggleRedLit();
		}, gameSpeed * 0.5);
	} else if (buttonId === 3) {
		toggleYellowLit();
		setTimeout(() => {
			toggleYellowLit();
		}, gameSpeed * 0.5);
	} else if (buttonId === 4) {
		toggleBlueLit();
		setTimeout(() => {
			toggleBlueLit();
		}, gameSpeed * 0.5);
	}
};
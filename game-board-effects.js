//Target all game buttons
const gameButtons = document.querySelectorAll('game-button');

//Target individual game buttons
const greenButton = document.querySelector('.green');
const redButton = document.querySelector('.red');
const yellowButton = document.querySelector('.yellow');
const blueButton = document.querySelector('.blue');

//Button event listeners

greenButton.addEventListener('click', lightShow);

//Set time delay in milliseconds for lit state toggle. Will adjust by difficulty level.
let gameSpeed = 1000;

//Set time delay in milliseconds for light cycle and flicker
const cycleSpeed = 75;

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

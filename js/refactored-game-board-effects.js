//Target all game buttons
const gameButtons = document.querySelectorAll('game-button');

//target timer bar
const timerBar = document.querySelector('.timer-bar');
const timerSegments = document.querySelectorAll('.timer-segment');

//Set time delay in milliseconds for light cycle and flicker
const cycleSpeed = 60;

//Refactored original code: Button object constructor handles creation of button target, toggle lit function, Audio object creation, audio source assignment, and playSound function;
class button {
	constructor(color, id, audioFilePath) {
		this.color = color;
		this.id = id;
		this.target = document.querySelector(`.${color}`);
		this.toggleLit = function () {
			this.target.classList.toggle(`${color}-lit`);
		};
		//create new Audio object and assign source
		this.audio = new Audio();
		this.audio.src = audioFilePath;
		//set currentTime of audio object to zero before calling .play method
		this.playSound = function () {
			this.audio.currentTime = 0;
			this.audio.play();
		};
	}
}
//declare array for button objects
const buttonArray = [];
//addButton function uses button constructor to create button objects then push to an array
function addButton(color, id, audioFilePath) {
	this.color = new button(color, id, audioFilePath);
	buttonArray.push(this.color);
}

//create each button object
addButton('green', 0, 'sounds/simonSound1.mp3');
addButton('red', 1, 'sounds/simonSound2.mp3');
addButton('blue', 3, 'sounds/simonSound3.mp3');
addButton('yellow', 2, 'sounds/simonSound4.mp3');

//refactored lightCycle and flickerAll functions shorten original nested setTimeout functions that used separate individual lit state toggle functions
function lightCycle() {
	let i = 0;
	setInterval(() => {
		if (i < buttonArray.length) {
			buttonArray[i].toggleLit();
			buttonArray[i].playSound();
			setTimeout(() => {
				buttonArray[i].toggleLit();
				i++;
			}, cycleSpeed);
		} else return;
	}, cycleSpeed * 2);
}
//toggle lit state on and off for all game buttons
function flickerAll() {
	buttonArray.forEach((b) => {
		b.toggleLit();
	});
	setTimeout(() => {
		buttonArray.forEach((b) => {
			b.toggleLit();
		});
	}, cycleSpeed);
}

//Perform light show for startup
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

//refactored demonstrate moves
let moveIndex = 0;
//demonstrate is passed the moves array, consisting of button ids
function demonstrate(arr) {
	//base case ends recursive function and returns moveindex to zero
	if (moveIndex >= arr.length) {
		return (moveIndex = 0);
		//check array[moveIndex] value and toggle lit state on corresponding game-button
	} else {
		//credit to this jcuenod's solution for findIndex by key value https://stackoverflow.com/questions/11258077/how-to-find-index-of-an-object-by-key-and-value-in-an-javascript-array
		const index = buttonArray.findIndex((b) => b.id == arr[moveIndex]);
		buttonArray[index].toggleLit();
		buttonArray[index].playSound();
		setTimeout(() => {
			buttonArray[index].toggleLit();
		}, gameSpeed);
	}
	//increment moveIndex
	moveIndex += 1;
	//delay recursion by gamespeed * 2 to allow lit state toggle to complete
	setTimeout(() => {
		demonstrate(arr);
	}, gameSpeed * 2);
}

//refactored toggle lit state on pressed button
function buttonPressLight(buttonId) {
	const index = buttonArray.findIndex((b) => b.id == buttonId);
	buttonArray[index].toggleLit();
	buttonArray[index].playSound();
	setTimeout(() => {
		buttonArray[index].toggleLit();
	}, gameSpeed);
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

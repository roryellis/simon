//declare sound variables
let greenNoise = new Audio();
greenNoise.src = 'sounds/simonSound1.mp3';

let redNoise = new Audio();
redNoise.src = 'sounds/simonSound2.mp3';


let yellowNoise = new Audio();
yellowNoise.src = 'sounds/simonSound4.mp3';

let blueNoise = new Audio();
blueNoise.src = 'sounds/simonSound3.mp3';

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
#Simon - Game

Built by Rory Ellis 4/2020

Project 1 entry for General Assembly: Software Engineering Immersive Remote - 323 program.

I claim no ownership over the trademarked name or likeness of the Simon game, presented here under "fair use" as non-commercial and educational material.

##Play The Game
A live hosted version of this game can be found at https://roryellis.github.io/simon/

##Features

- Interactive game board
- "Lighting" effects via CSS "lit" classes
- Adjustable difficulty
  ..\* Selects from an array of 4 available game speeds used to set timing of
- Secondary "Reverse" game mode
  ..\* Uses .reverse() array method to reverse the order of expected moves in checkMoves()
- Score tracking
  ..\* Scoring is calculated as a multiple of the difficulty level and remaining time left available.
- Local Top Score Storage
  ..\* When the a user's current score is higher than the topScoreValue, the new topScoreValue is stored locally to be recalled when the game is re-visited.

##Technologies

- Game layout: HTML
- Styling: CSS
- Interactive Functionality: Javascript

##Game Instructions
Simon is a simple game of "follow the leader".

- Click "Start", and Simon will flash a button. Follow Simon's lead and press the same button. If your button is correct, you score points and proceed to the next round!

- For each additional round, Simon will add a new button to the sequence. Repeat the sequence, stack up points, and test your memory.

- Complete the sequence before the timer runs out. The faster you are, the more points you score.

- Press the "Difficulty" button to cycle through 4 game speed options. Each difficulty level multiplies your points!

- Click "Mode" to reverse the sequence. Every time Simon gives a sequence, you have to enter it backwards!

##Contributions
This is a solo project presented for evaluation and is not open for outside contributions at this time.

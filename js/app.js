/*
variables
*/
let theWord = "";
let picked = [];
let wrong = 0;
let done = false;

/*
DOM elements, Used Chatgpt to see what it would look like in const, originally done with var which i had to change
*/
const wordEl = document.getElementById("word");
const buttonsEl = document.getElementById("buttons");
const msgEl = document.getElementById("msg");
const btnEl = document.getElementById("btn");
const wrongEl = document.getElementById("wrong");
const guessedEl = document.getElementById("guessed");
const statusEl = document.getElementById("status");

/*
Starts new game
*/
function start() {
  const num = Math.floor(Math.random() * wordList.length);
  theWord = wordList[num];
  
  picked = [];
  wrong = 0;
  done = false;
  
  msgEl.textContent = "";
  msgEl.className = "msg";
  
  showWord();
  makeButtons();
  updateCount();
  updateStatus();
}

/*
Display word with guessed letters
*/
function showWord() {
  let text = "";
  
  for (let i = 0; i < theWord.length; i++) {
    const char = theWord[i];
    
    if (char === " ") {
      text = text + "  ";
    } else if (picked.includes(char)) {
      text = text + char + " ";
    } else {
      text = text + "_ ";
    }
  }
  
  wordEl.textContent = text;
}

/*
letter buttons
*/
function makeButtons() {
  buttonsEl.innerHTML = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const button = document.createElement("button");
    button.textContent = letter;
    button.className = "letter";
    
    if (picked.includes(letter)) {
      button.disabled = true;
    }
    
    button.addEventListener('click', function() {
      clickLetter(letter);
    });
    
    buttonsEl.appendChild(button);
  }
}

/*
letter clicks
*/
function clickLetter(letter) {
  if (done) {
    return;
  }
  
  picked.push(letter);
  
  if (theWord.includes(letter)) {
    showWord();
    checkWin();
  } else {
    wrong = wrong + 1;
    updateStatus();
    checkLose();
  }
  
  makeButtons();
  updateCount();
}

/*
Update counters
*/
function updateCount() {
  wrongEl.textContent = wrong + " / 6";
  guessedEl.textContent = picked.length;
}

/*
Update status message
*/
function updateStatus() {
  const messages = [
    "Spaceman is safe",
    "One wrong",
    "Two wrong",
    "Three wrong",
    "Four wrong",
    "Five wrong",
    "Game over"
  ];
  statusEl.textContent = messages[wrong];
}

/*
Check if player won
*/
function checkWin() {
  let win = true;
  
  for (let i = 0; i < theWord.length; i++) {
    const char = theWord[i];
    if (char !== " " && !picked.includes(char)) {
      win = false;
    }
  }
  
  if (win) {
    done = true;
    msgEl.textContent = "You won! Spaceman is saved!";
    msgEl.className = "msg good";
  }
}

/*
Check if player lost
*/
function checkLose() {
  if (wrong >= 6) {
    done = true;
    msgEl.textContent = "You lost! Word was: " + theWord;
    msgEl.className = "msg bad";
    reveal();
  }
}

/*
Reveal word
*/
function reveal() {
  let text = "";
  
  for (let i = 0; i < theWord.length; i++) {
    if (theWord[i] === " ") {
      text = text + "  ";
    } else {
      text = text + theWord[i] + " ";
    }
  }
  
  wordEl.textContent = text;
}

/*
Event listener for new game
*/
btnEl.addEventListener('click', start);

/*
Start game on load
*/
start();
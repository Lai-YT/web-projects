/* elements used to interact with the player */
const guessField = document.querySelector('.guess-field');
guessField.focus();
const guessRecord = document.querySelector('.guess-record');
const lastResult = document.querySelector('.last-result');
const lowOrHight = document.querySelector('.low-or-high');

let answer = generateRandomIntBetweenOneAndAHundred();
let guessChance = 10;

function verifyGuess() {
  const userGuess = Number(guessField.value);
  updateGuessRecord(userGuess);

  /* check guess */
  if (isRightGuess(userGuess)) {
    congratulateOnRightGuess();
    lowOrHight.textContent = '';
    setGameOver();
  } else if (guessChanceUsedUp()) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    booOnWrongGuess();
    if (userGuess < answer) {
      lowOrHight.textContent = 'Last guess was too low!';
    } else {
      lowOrHight.textContent = 'Last guess was too high!';
    }
  }
  --guessChance;
  guessField.value = '';
  guessField.focus();
}

const guessSubmit = document.querySelector('.guess-submit');
guessSubmit.addEventListener('click', verifyGuess);

function generateRandomIntBetweenOneAndAHundred() {
  return Math.ceil(Math.random() * 100);
}

function updateGuessRecord(userGuess) {
  if (guessChance === 10) {
    guessRecord.textContent = 'Previous guesses: ';
  }
  guessRecord.textContent += userGuess + ' ';
}

function congratulateOnRightGuess() {
  lastResult.textContent = 'Congratulations! You got it right!';
  lastResult.style.backgroundColor = 'green';
}

function booOnWrongGuess() {
  lastResult.textContent = 'Wrong!';
  lastResult.style.backgroundColor = 'red';
}

function guessChanceUsedUp() {
  return guessChance === 1;
}

function isRightGuess(userGuess) {
  return userGuess === answer;
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  let resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessChance = 10;
  resetResultParas();
  removeResetButton();

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';
  answer = generateRandomIntBetweenOneAndAHundred();
}

function resetResultParas() {
  let resultParas = document.querySelectorAll('.result-paras p');
  for (let i = 0; i < resultParas.length; i++) {
    resultParas[i].textContent = '';
  }
}

function removeResetButton() {
  let resetButton = document.querySelector('body button');
  resetButton.parentNode.removeChild(resetButton);
}

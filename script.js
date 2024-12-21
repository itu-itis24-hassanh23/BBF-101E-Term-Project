let word = '';
let score = 0;
let lives = 3;
let guessedLetters = new Set();
let guess_word = "PRISM";
function initGame() {
   word = words[Math.floor(Math.random() * words.length)];
   score = 0;
   lives = 3;
   guessedLetters.clear();
}

   updateDisplay();

function updateDisplay() {
   const letterBoxes = document.querySelectorAll('.letter-box');
   for(let i = 0; i < word.length; i++) {
       letterBoxes[i].textContent = guessedLetters.has(word[i]) ? word[i] : '';
   }
}

   document.getElementById('score').textContent = score;
   document.getElementById('lives').textContent = '❤️'.repeat(lives);

function checkGuess() {
   const guess = document.getElementById('prediction-input').value.toUpperCase();
}

   if(guess.length === 1) {
       if(word.includes(guess)) {
           guessedLetters.add(guess);
           score += 20;
           if([...word].every(letter => guessedLetters.has(letter))) {
               alert('Congratulations! You won!');
           }
       } else {
           lives--;
           if(lives === 0) {
               alert('Game Over! The word was: ' + word);
           }
       }
   } else if(guess.length === word.length) {

       if(guess === word) {
           score = 100;
           guessedLetters = new Set(word.split(''));
           alert('Congratulations! You won!');
       } else {
           lives = 0;
           alert('Game Over! The word was: ' + word);
       }
   }
   
   document.getElementById('prediction-input').value = '';
   updateDisplay();

document.getElementById('submit-btn').addEventListener('click', checkGuess);
document.getElementById('reset-btn').addEventListener('click', initGame);


initGame();
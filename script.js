let word;
let lives;
let score;
let hiddenWord;

function initialise() {
    word = "prism";
    lives = 3;
    score = 0;
    hiddenWord = Array(word.length).fill("_");

    Array.from(displayContainer.children).forEach((placeholder) => {
        placeholder.innerHTML = " ";
    });

    messageEl.textContent = "Game Started! Make a guess.";
    messageEl.style.color = "black";
    guessInput.value = "";
    guessBtn.disabled = false;

    updateDisplay();
}


const displayContainer = document.getElementById("word-display");
const livesEl = document.getElementById("lives");
const scoreEl = document.getElementById("score");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");
const messageEl = document.getElementById("message");

function updateDisplay() {
    hiddenWord.forEach((letter, index) => {
        const placeholder = displayContainer.children[index];
        if (letter !== "_" && !placeholder.querySelector("img")) {
            const img = document.createElement("img");
            img.src = `images/hangman/${letter}.svg`;
            placeholder.innerHTML = "";
            placeholder.appendChild(img);
        }
    });
    livesEl.textContent = "❤️".repeat(lives) + "🤍".repeat(3 - lives);
    scoreEl.textContent = score;
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    if (guess.length === 1 && word.includes(guess)) {
        word.split("").forEach((char, i) => {
            if (char === guess) hiddenWord[i] = char;
        });
        score += 20;
        messageEl.textContent = "Correct guess!";
        messageEl.style.color = "green";
    } else if (guess === word) {
        hiddenWord = word.split("");
        score = 100;
        messageEl.textContent = "You guessed the word!";
        messageEl.style.color = "green";
    } else {
        lives--;
        messageEl.textContent = "Wrong guess!";
        messageEl.style.color = "red";
    }
    if (!hiddenWord.includes("_")) {
        messageEl.textContent = `You won! The word was '${word}'.`;
        guessBtn.disabled = true;
    }
    if (lives === 0) {
        messageEl.textContent = `Game over! The word was '${word}'.`;
        messageEl.style.color = "red";
        guessBtn.disabled = true;
    }
    updateDisplay();
}

resetBtn.addEventListener('click', initialise)
guessBtn.addEventListener("click", checkGuess);
initialise()
updateDisplay();
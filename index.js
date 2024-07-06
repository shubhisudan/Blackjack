let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";
let bet = 0;
let player = {
    name: "Per",
    chips: 200
};

let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.getElementById("player-el");
let chipsEl = document.getElementById("chips-el");
let betEl = document.getElementById("bet-el");

playerEl.textContent = `${player.name}`;
chipsEl.textContent = `Chips: $${player.chips}`;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber > 10) {
        return 10;
    } else {
        return randomNumber;
    }
}

function startGame() {
    isAlive = true;
    hasBlackjack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" ");
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackjack = true;
        player.chips += bet * 2;
        updateChips();
    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips -= bet;
        updateChips();
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
        if (sum > 21) {
            endGame();
        }
    }
}

function placeBet() {
    let inputBet = parseInt(prompt("Place your bet:", "0"));
    if (!isNaN(inputBet) && inputBet >= 0 && inputBet <= player.chips) {
        bet = inputBet;
        betEl.textContent = `Bet: $${bet}`;
    } else {
        alert("Invalid bet amount. Please try again.");
    }
}

function updateChips() {
    chipsEl.textContent = `Chips: $${player.chips}`;
    betEl.textContent = "Bet: $0";
    bet = 0;
}

function resetGame() {
    cards = [];
    sum = 0;
    hasBlackjack = false;
    isAlive = false;
    message = "";
    bet = 0;
    player.chips = 200;
    cardsEl.textContent = "Cards:";
    sumEl.textContent = "Sum:";
    messageEl.textContent = "Want to play a round?";
    updateChips();
}

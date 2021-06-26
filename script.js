'use strict';

const roll = document.getElementById('roll-dice');
const newGame = document.getElementById('new-game');
const hold = document.getElementById('hold-dice');
const rollImage = document.getElementById('dice-image');
let activePlayer = 'player1';
let winner = '';
const players = {
    player1: {
        sectionId: document.getElementById('player--1'),
        currentScore: 0,
        totalScore: 0,
        currentScoreElem: document.getElementById('current--0'),
        totalScoreElem: document.getElementById('score--0')
    },
    player2: {
        sectionId: document.getElementById('player--2'),
        currentScore: 0,
        totalScore: 0,
        currentScoreElem: document.getElementById('current--1'),
        totalScoreElem: document.getElementById('score--1')
    }
}

function generateRandomNumber() {
    return Math.trunc(Math.random() * 6 + 1);
}

function rollDice() {
    const rolledNumber = generateRandomNumber();
    const imageSrc = 'dice-' + rolledNumber + '.png';
    rollImage.setAttribute('src', imageSrc);
    showDiceImage();
    if (rolledNumber === 1) {
        switchPlayer();
    } else {
        players[activePlayer].currentScore += rolledNumber;
        updateCurrentValue();
    }
}

function updateCurrentValue() {
    players[activePlayer].currentScoreElem.textContent = players[activePlayer].currentScore;
}

function resetCurrentValue() {
    players[activePlayer].currentScoreElem.textContent = 0;
    players[activePlayer].currentScore = 0;
}

function switchPlayer() {
    resetCurrentValue();
    const otherPlayer = activePlayer === Object.keys(players)[0] ? Object.keys(players)[1] : Object.keys(players)[0];
    players[activePlayer].sectionId.classList.toggle('player--active');
    players[otherPlayer].sectionId.classList.toggle('player--active');
    activePlayer = otherPlayer;
    // hideDiceImage
}

function showDiceImage() {
    rollImage.classList.remove('hidden');
}

function hideDiceImage() {
    if (!rollImage.classList.contains('hidden')) {
        rollImage.classList.add('hidden');
    }
}

function holdDice() {
    players[activePlayer].totalScore += players[activePlayer].currentScore;
    players[activePlayer].totalScoreElem.textContent = players[activePlayer].totalScore;
    if (players[activePlayer].totalScore > 100) {
        players[activePlayer].sectionId.classList.add('player--winner');
        winner = activePlayer;
    } else {
        switchPlayer();
    }
}

function refreshGame() {
    hideDiceImage();
    for (let player of Object.keys(players)) {
        players[player].currentScore = 0;
        players[player].totalScore = 0;
        players[player].totalScoreElem.textContent = 0;
    }
    // activePlayer = 'player2'
    // activePlayer = 'player2';


    switchPlayer();
    if (!players.player1.sectionId.classList.contains('player--active')) {

        players.player1.sectionId.classList.add('player--active');
    }
    if (players.player2.sectionId.classList.contains('player--active')) {
        players.player2.sectionId.classList.remove('player--active');
    }
    if (winner !== '') {
        players[winner].sectionId.classList.remove('player--winner');
        winner = '';
    }
    activePlayer = 'player1';
    resetCurrentValue();
}

roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdDice);
newGame.addEventListener('click', refreshGame)


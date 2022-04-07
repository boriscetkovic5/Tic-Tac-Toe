const editPlayer1Btn = document.getElementById("edit-player-1-btn");
const editPlayer2Btn = document.getElementById("edit-player-2-btn");
const cancelConfigBtn = document.getElementById("cancel-config-btn");
const startNewGameBtn = document.getElementById("start-game-btn");
const activeGameSection = document.getElementById("active-game");
const gameBoard = document.getElementById("game-board");
const activePlayerName = document.getElementById("active-player-name");
const gameOver = document.getElementById("game-over");

const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name: "",
        symbol: "X"
    },

    {
        name: "",
        symbol: "O"
    }
];

const backDrop = document.getElementById("backdrop");
const playerConfigOverlay = document.getElementById("config-overlay");
const formElement = document.querySelector("form");
const configErrors = document.getElementById("config-errors");

editPlayer1Btn.addEventListener("click", openPlayerConfig);
editPlayer2Btn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closePlayerConfig);
backDrop.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtn.addEventListener("click", startNewGame);

gameBoard.addEventListener("click", selectGameField);
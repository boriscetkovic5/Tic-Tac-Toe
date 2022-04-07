function openPlayerConfig(e) {
    editedPlayer = +e.target.dataset.playerid;
    backDrop.style.display = "block";
    playerConfigOverlay.style.display = "block";
}

function closePlayerConfig() {
    backDrop.style.display = "none";
    playerConfigOverlay.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    configErrors.textContent = "";
    document.getElementById("playername").value = "";
}

function savePlayerConfig(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredPlayername = formData.get("playername").trim();

    if(enteredPlayername === "") {
        e.target.firstElementChild.classList.add("error");
        configErrors.textContent = "Please enter a valid name!";
        return;
    }

    const updatedPlayerData = document.getElementById("player-" + editedPlayer + "-data");
    updatedPlayerData.children[1].textContent = enteredPlayername;

    players[editedPlayer - 1].name = enteredPlayername;
    closePlayerConfig();
}

function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOver.firstElementChild.innerHTML = 
    'You won, <span id="winner-name">PLAYER NAME</span>';
    gameOver.style.display = "none";

    let gameBoardIndex = 0;

    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            gameData[i][j] = 0;
            const gameBoardItem = gameBoard.children[gameBoardIndex];
            gameBoardItem.textContent = "";
            gameBoardItem.classList.remove("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if(players[0].name === "" || players[1].name === "") {
        alert("Please set names for both players");
        return;
    }

    resetGameStatus();

    activePlayerName.textContent = players[activePlayer].name;
    activeGameSection.style.display = "block";
}

function switchPlayer() {
    if(activePlayer === 0) {
        activePlayer = 1;
    }

    else {
        activePlayer = 0;
    }

    activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(e) {
    if(e.target.tagName !== "LI" || gameIsOver === true) {
        return;
    }

    const selectedField = e.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0) {
        alert("Please select an empty field!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");


    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    const winnerId = checkForGameOver();
    
    if(winnerId !==0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    for(let i=0; i<3; i++) {
        if(
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }

    for(let i=0; i<3; i++) {
        if(
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }

    if(
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }

    if(
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }

    if(currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOver.style.display = "block";
    
    if(winnerId > 0) {
        const winnerName = players[winnerId -1].name;
        gameOver.firstElementChild.firstElementChild.textContent = winnerName;
    }

    else {
        gameOver.firstElementChild.textContent = "It's a draw";
    }
}


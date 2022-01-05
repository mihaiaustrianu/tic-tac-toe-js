//Gameboard module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function updateElement(id, playerSymbol) {
    board[id] = playerSymbol;
  }
  function clearBoard() {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
  }
  return {
    board,
    updateElement,
    clearBoard,
  };
})();

//Display Controller module
const displayController = (() => {
  const statusDisplay = document.querySelector(".game-status");
  
  const drawMessage = () => `Game ended in a draw!`;
  const currentPlayerTurn = () =>
    `It's player ${switchP()}'s turn`;
  const button = document.querySelector(".restart");

  function updateDisplay(roundWon, roundDraw) {
    console.log('display');
    console.log(gameController.getPlayer());
    let winningMessage = () => `Player ${gameController.getPlayer()}  won!`;
    for (let item in gameBoard.board) {
      let element = document.getElementById(`position-${item}`);
      element.innerHTML = gameBoard.board[item];
    }
    if (roundDraw == false && roundWon == false) {
      displayStatus();
    } else if (roundWon == true) {
      statusDisplay.innerHTML = winningMessage();
      button.style.display = "inline-block";
    } else if (roundDraw == true) {
      statusDisplay.innerHTML = drawMessage();
      button.style.display = "inline-block";
    }
  }
  function switchP(){
    if(gameController.getPlayer() ==1)
    return 2;
    else
    return 1;
  }

  function displayStatus() {
    button.style.display = "none";
    statusDisplay.innerHTML = currentPlayerTurn();
  }
  function resetHandler() {
    gameBoard.clearBoard();
    displayStatus();
    updateDisplay();
    gameController.setP()
    gameController.setGameActive();
  }

  return {
    updateDisplay: updateDisplay,
    resetHandler: resetHandler,
  };
})();

//Game controller
const gameController = (() => {
  let playerTurnValue = 1;
  gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function setP(){
    playerTurnValue =1 ;
  }
  function getPlayer() {
    return playerTurnValue;
  }

  function setGameActive() {
    gameActive = true;
  }

  function playerTurn() {
    if (playerTurnValue == 1) {
      playerTurnValue = 2;
    } else playerTurnValue = 1;
  }
  function playerMove(id) {
    let playerSymbol;
    if (playerTurnValue == 1) {
      playerSymbol = "X";
    } else playerSymbol = "0";
    gameBoard.updateElement(id, playerSymbol);
  }
  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-item-index")
    );
    //console.log(clickedCellIndex);
    if (gameBoard.board[clickedCellIndex] !== "" || !gameActive) {
      return;
    }
    playerMove(clickedCellIndex, playerTurnValue);
    
    [roundWon, roundDraw] = handleResult();
    displayController.updateDisplay(roundWon, roundDraw,playerTurn);
    playerTurn();
  }
  function handleResult() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameBoard.board[winCondition[0]];
      let b = gameBoard.board[winCondition[1]];
      let c = gameBoard.board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        gameActive = false;
        break;
      }
    }
    let roundDraw = !gameBoard.board.includes("");
    if (roundDraw == true) {
      gameActive = false;
    }
    return [roundWon, roundDraw];
  }

  return {
    handleCellClick,
    getPlayer,
    setGameActive,
    setP
  };
})();

displayController.updateDisplay();
document
  .querySelectorAll(".grid-item")
  .forEach((item) =>
    item.addEventListener("click", gameController.handleCellClick)
  );
button = document
  .querySelector(".restart")
  .addEventListener("click", displayController.resetHandler);

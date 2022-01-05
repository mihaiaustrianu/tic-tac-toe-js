//Gameboard module
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  function updateElement(id, playerSymbol) {
    board[id] = playerSymbol;
  }

  return {
    board,
    updateElement
  };
})();

//Display Controller module
const displayController = (() => {
  function updateDisplay() {
    for (let item in gameBoard.board) {
      let element = document.getElementById(`position-${item}`);
      element.innerHTML = gameBoard.board[item];
    }
  }
  return {
    updateDisplay: updateDisplay,
  };
})();
//Game controller
const gameController = (() => {
  playerTurnValue = 1;

  function playerTurn() {
    if (playerTurnValue == 1) {
        playerTurnValue = 2;
    }
    else playerTurnValue = 1;
  }
  function playerMove(id){
      let playerSymbol;
      if(playerTurnValue == 1){
        playerSymbol = 'X'
      }
      else playerSymbol = '0'
      gameBoard.updateElement(id,playerSymbol);
      playerTurn();
  }
  function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-item-index')
      );
      console.log(clickedCellIndex);
    if (gameBoard.board[clickedCellIndex] !=="") {
        return;
    }
    playerMove(clickedCellIndex,playerTurnValue);
    displayController.updateDisplay();
  }

  return{
    handleCellClick
  }
})();

displayController.updateDisplay();
document.querySelectorAll('.grid-item').forEach(item => item.addEventListener('click', gameController.handleCellClick));
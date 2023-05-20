import GameBoard from './GameBoard.js';
import PopupController from '../UIActions/PopupController.js';

export default class CheckUserBoard extends GameBoard {
  constructor(id) {
    super(id);
    this.inputs = document.querySelectorAll(`#game-board-${id} input`);
  }
  // For this method we using new Set, to avoid duplication
  _checkCurrentGameBoard() {
    for (let row = 0; row < this.boardSize; row++) {
      const rowValues = new Set();
      const colValues = new Set();
      for (let col = 0; col < this.boardSize; col++) {
        const rowVal = parseInt(this.inputs[row * this.boardSize + col].value);
        if (
          rowVal < 1 ||
          rowVal > 9 ||
          rowValues.has(rowVal) ||
          isNaN(rowVal) ||
          !rowVal
        ) {
          return false;
        }
        rowValues.add(rowVal);
        const colVal = parseInt(this.inputs[col * this.boardSize + row].value);
        if (
          colVal < 1 ||
          colVal > 9 ||
          colValues.has(colVal) ||
          isNaN(colVal) ||
          !colVal
        ) {
          return false;
        }
        colValues.add(colVal);
      }
    }
    for (let gridRow = 0; gridRow < this.boardSize; gridRow += this.gridSize) {
      for (
        let gridCol = 0;
        gridCol < this.boardSize;
        gridCol += this.gridSize
      ) {
        const gridValues = new Set();
        for (let row = 0; row < this.gridSize; row++) {
          for (let col = 0; col < this.gridSize; col++) {
            const gridVal = parseInt(
              this.inputs[(gridRow + row) * this.boardSize + gridCol + col]
                .value
            );
            if (
              gridVal < 1 ||
              gridVal > 9 ||
              gridValues.has(gridVal) ||
              isNaN(gridVal) ||
              !gridVal
            ) {
              return false;
            }
            gridValues.add(gridVal);
          }
        }
      }
    }
    return true;
  }

  checkForPopupContent() {
    // At the end of the game, the user will know whether he won or not
    // And for that we need to know whether all the inputs are filled or not
    // to check the puzzle
    const areAllInputsFilled = [...this.inputs].every(
      input => input.value !== ''
    );
    if (areAllInputsFilled && this._checkCurrentGameBoard()) {
      PopupController.showPopup('You Solve the Puzzle👏, Congratulations💥💯');
    } else if (areAllInputsFilled && !this._checkCurrentGameBoard()) {
      PopupController.showPopup('Puzzle is not solved yet, keep going!👊');
    }
  }
}

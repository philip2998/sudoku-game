import GameBoard from './GameBoard.js';
import PopupController from '../UIActions/PopupController.js';

export default class CountUserErrors extends GameBoard {
  #countErr = 0;
  constructor(id) {
    super(id);
    this.inputs = document.querySelectorAll(`#game-board-${id} input`);
    this.errorCounter = document.getElementById(`error-count-${id}`);
  }
  // For this method we use 'isDuplicate' var to keep track of whether
  // duplicate value has been found in any of the checks made
  _checkUserErrors(row, col, value) {
    let isDuplicate = false;
    let inputVal;
    for (let i = 0; i < this.boardSize; i++) {
      inputVal = parseInt(this.inputs[row * this.boardSize + i].value);
      if (inputVal == value && i != col) {
        // if another duplicate value is found in the same check
        // the 'continue' statement is used to skip the current
        // iteration of the loop and move on to the next iteration
        if (isDuplicate) {
          continue;
        }
        isDuplicate = true;
        this.#countErr++;
      }
    }
    for (let j = 0; j < this.boardSize; j++) {
      inputVal = parseInt(this.inputs[j * this.boardSize + col].value);
      if (inputVal == value && j != row) {
        if (isDuplicate) {
          continue;
        }
        isDuplicate = true;
        this.#countErr++;
      }
    }
    this.gridRow = Math.floor(row / this.gridSize) * this.gridSize;
    this.gridCol = Math.floor(col / this.gridSize) * this.gridSize;
    for (let i = this.gridRow; i < this.gridRow + this.gridSize; i++) {
      for (let j = this.gridCol; j < this.gridCol + this.gridSize; j++) {
        inputVal = parseInt(this.inputs[i * this.boardSize + j].value);
        if (inputVal == value && i != row && j != col) {
          if (isDuplicate) {
            continue;
          }
          isDuplicate = true;
          this.#countErr++;
        }
      }
    }
    this.errorCounter.textContent = this.#countErr.toString();
    if (this.#countErr == 3) {
      PopupController.showPopup(
        `You already have 3 Errors, You lose this ${this.id} Game, try again❗👇`
      );
    }
  }
  // For checking user's errors we use event listener
  // in every input. We check number by dataset
  showUserErrors(errors) {
    this.#countErr = errors ?? 0;
    this.errorCounter.textContent = this.#countErr;
    this.inputs.forEach(input => {
      input.addEventListener('keyup', () => {
        const row = parseInt(input.dataset.row);
        const col = parseInt(input.dataset.col);
        const inputValue = parseInt(input.value);
        if (isNaN(inputValue) || inputValue < 1 || inputValue > 9) {
          input.value = '';
        } else {
          this._checkUserErrors(row, col, inputValue);
        }
      });
    });
  }
}

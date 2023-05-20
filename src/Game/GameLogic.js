import GameBoard from './GameBoard.js';

export default class GameLogic extends GameBoard {
  sudokuBoard = Array(9)
    .fill()
    .map(() => Array(9).fill(0));
  inputs = document.querySelectorAll(`#game-board-${this.id} input`);
  #solutionBoard;
  #randomBoard;
  #solvedBoard;
  filledBoard;

  constructor(id) {
    super(id);
    this._addInputListeners();
  }

  // For solving any Sudoku puzzle we use backtracking
  _solveSudokuPuzzle(board) {
    const emptyCell = this._findEmptyCell(board);
    if (!emptyCell) return board;

    const [row, col] = emptyCell;
    for (let value = 1; value <= this.boardSize; value++) {
      if (this._isValidSudoku(board, row, col, value)) {
        // and if valid, set it in the empty cell
        board[row][col] = value;
        if (this._solveSudokuPuzzle(board)) {
          return board;
        } else {
          // If the value does not work, Backtrack and try the next one
          board[row][col] = 0;
        }
      }
    }
    return false;
  }

  _isValidSudoku(board, row, col, value) {
    for (let i = 0; i < this.boardSize; i++) {
      if (board[row][i] == value || board[i][col] == value) {
        return false;
      }
    }
    const gridRow = Math.floor(row / this.gridSize) * this.gridSize;
    const gridCol = Math.floor(col / this.gridSize) * this.gridSize;
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (board[gridRow + i][gridCol + j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  _findEmptyCell(board) {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const value = board[row][col];
        if (value == 0) {
          return [row, col];
        }
      }
    }
    return null;
  }
  _addInputListeners() {
    this.inputs.forEach(input => {
      input.addEventListener('input', e => {
        const input = e.target;
        const row = Math.floor(input.dataset.row);
        const col = Math.floor(input.dataset.col);
        const value = parseInt(input.value) || 0;
        if (this._isValidSudoku(this.sudokuBoard, row, col, value)) {
          this.sudokuBoard[row][col] = value;
        } else {
          input.value = '';
          this.sudokuBoard[row][col] = 0;
        }
      });
    });
  }
  // For user making Valid random game board every time
  // which contain 25 numbers
  _randomizeSudokuBoard() {
    this.#randomBoard = this._solveSudokuPuzzle(this.sudokuBoard);
    let count = 56;
    while (count > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (this.#randomBoard[row][col] != 0) {
        const value = this.#randomBoard[row][col];
        if (!this._isValidSudoku(this.#randomBoard, row, col, value)) {
          this.#randomBoard[row][col] = 0;
          count--;
        }
      }
    }
    return this.#randomBoard;
  }

  displayValuesInSudokuBoard(existingBoard) {
    this.sudokuBoard = existingBoard ?? this._randomizeSudokuBoard();
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const input = this.inputs[row * this.boardSize + col];
        const cellValue = this.sudokuBoard[row][col];
        input.value = cellValue == 0 ? '' : cellValue.toString();
        input.readOnly = input.value == '' ? false : true;
        input.addEventListener('input', e => {
          const inputValue = parseInt(e.target.value);
          this.sudokuBoard[row][col] =
            !isNaN(inputValue) && inputValue >= 1 && inputValue <= 9
              ? inputValue
              : 0;
        });
      }
    }
  }
  _showSolutionInBoard(board) {
    this.#solutionBoard = board;
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const input = this.inputs[row * 9 + col];
        const value = this.#solutionBoard[row][col];
        input.value = value.toString();
      }
    }
  }
  solveGame() {
    this.#solvedBoard = this.sudokuBoard;
    this._solveSudokuPuzzle(this.#solvedBoard);
    this._showSolutionInBoard(this.#solvedBoard);
  }
}

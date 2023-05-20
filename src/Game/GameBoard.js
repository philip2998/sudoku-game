import CreateHtml from '../HtmlAndElements/CreateHTML.js';

export default class GameBoard extends CreateHtml {
  boardSize = 9;
  gridSize = 3;
  gridRow;
  gridCol;

  constructor(id) {
    super(id);
    this.id = id;
  }

  createGameBoard() {
    this.html;
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const inputs = document.createElement('input');
        inputs.id = `${this.id}`;
        inputs.dataset.row = row;
        inputs.dataset.col = col;
        this.gridRow = Math.floor(row / this.gridSize) * this.gridSize;
        this.gridCol = Math.floor(col / this.gridSize) * this.gridSize;
        const gridSum = this.gridRow + this.gridCol;
        if (gridSum % 2 == 0) {
          inputs.classList.add('even-section');
        } else {
          inputs.classList.add('odd-section');
        }
        this.puzzle.appendChild(inputs);
      }
    }
  }
}

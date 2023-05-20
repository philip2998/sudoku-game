// We can have multiple Game Board, for that reason we create our
// HTML element in JS and we don't want our JS code to depend on HTML
export default class CommonHtmlElements {
  constructor(id) {
    this.gameBoard = document.createElement('div');
    this.gameBoard.classList.add('game-board');
    this.gameBoard.id = `game-board-${id}`;

    this.sudokuBoard = document.createElement('div');
    this.sudokuBoard.classList.add('sudoku-board');

    this.playIcon = document.createElement('div');
    this.playIcon.classList.add('icon', 'icon-play');
    this.playIcon.id = `play-${id}`;

    this.pauseIcon = document.createElement('div');
    this.pauseIcon.classList.add('icon', 'icon-pause');
    this.pauseIcon.id = `pause-${id}`;

    this.playingTime = document.createElement('span');
    this.playingTime.innerText = '00:00';
    this.playingTime.classList.add('playingTime');
    this.playingTime.id = `time-${id}`;

    this.whichBoard = document.createElement('span');
    this.whichBoard.textContent = `Board.${id + 1}`;
    this.whichBoard.classList.add('which-board');

    this.errorsContainer = document.createElement('p');
    this.errorsContainer.classList.add('errors-counter');

    this.errorsCounter = document.createElement('span');
    this.errorsCounter.classList.add('error');
    this.errorsCounter.id = `error-count-${id}`;
    this.errorsCounter.innerText = 0;

    this.actionBtns = document.createElement('div');
    this.actionBtns.classList.add('action-btns');

    this.removeBoard = document.createElement('button');
    this.removeBoard.innerHTML = `<i class="fas fa-trash fa-lg" style="color:#FC2947;"></i>`;
    this.removeBoard.classList.add('remove-board-btn');

    this.btnSave = document.createElement('button');
    this.btnSave.textContent = 'Save';
    this.btnSave.classList.add('save-game-btn');

    this.pauseMessage = document.createElement('div');
    this.pauseMessage.classList.add('pause-message');
    this.pauseMessage.id = `pause-message-${id}`;

    this.timerContainer = document.createElement('div');
    this.timerContainer.classList.add('timer-container');
    this.timerContainer.id = `timer-board-${id}`;

    this.puzzle = document.createElement('div');
    this.puzzle.classList.add('puzzle');
    this.puzzle.id = `puzzle-${id}`;

    this.btnLoad = document.createElement('button');
    this.btnLoad.type = 'button';
    this.btnLoad.classList.add('load-button');
    this.btnLoad.innerText = 'New Game';

    this.btnSolve = document.createElement('button');
    this.btnSolve.type = 'button';
    this.btnSolve.classList.add('solve-button');
    this.btnSolve.innerText = 'Solve';
  }
}

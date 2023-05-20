import CommonHtmlElements from './CommonhtmlElements.js';
import { gameSection } from './selectedElements.js';

// As we know, we already created our main HTML elements in
// CommonHtmlElements Class. So by CreateHtml we create our Game
export default class CreateHtml extends CommonHtmlElements {
  constructor(id) {
    super(id);
  }

  get html() {
    this.gameBoard.appendChild(this.sudokuBoard);

    this.sudokuBoard.appendChild(this.timerContainer);

    this.timerContainer.appendChild(this.pauseIcon);
    this.timerContainer.appendChild(this.playIcon);
    this.timerContainer.appendChild(this.playingTime);
    this.timerContainer.appendChild(this.whichBoard);
    this.timerContainer.appendChild(this.errorsContainer);

    const errorsText = document.createTextNode('Errors: ');
    this.errorsContainer.appendChild(errorsText);
    const threeErrors = document.createTextNode('/3');

    this.actionBtns.appendChild(this.removeBoard);
    this.actionBtns.appendChild(this.btnSave);
    this.gameBoard.appendChild(this.actionBtns);

    this.errorsContainer.appendChild(this.errorsCounter);
    this.errorsContainer.appendChild(threeErrors);

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    this.sudokuBoard.appendChild(boardContainer);

    boardContainer.appendChild(this.puzzle);
    boardContainer.appendChild(this.pauseMessage);

    const playButtonImg = document.createElement('img');
    playButtonImg.src = './img/play-button.png';
    playButtonImg.alt = 'play-button-icon';
    this.pauseMessage.appendChild(playButtonImg);

    this.sudokuBoard.appendChild(this.btnSolve);
    this.sudokuBoard.appendChild(this.btnLoad);

    return gameSection.appendChild(this.gameBoard);
  }
}

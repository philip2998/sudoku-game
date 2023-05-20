import CheckUserBoard from './CheckUserBoard.js';
import CountUserErrors from './CountUserErrors.js';
import GameBoard from './GameBoard.js';
import GameLogic from './GameLogic.js';
import GameTime from './GameTime.js';
import { newBoard, userName } from '../HtmlAndElements/selectedElements.js';
import UserGameDataManager from '../services/UserGameDataManager.js';
import GetUserInformation from '../services/GetUserInformation.js';
import LocalStorageHandler from '../services/LocalStorageHandler.js';
import PopupController from '../UIActions/PopupController.js';

export default class GameController {
  #board;
  #gameLogic;
  #timer;
  #checkBoard;
  #errorsCounter;
  static numGameBoards = 1;

  constructor(boardNumber) {
    this.#board = new GameBoard(boardNumber);
    this.#board.createGameBoard();

    GameController.numGameBoards++;

    this.#gameLogic = new GameLogic(boardNumber);
    this.#timer = new GameTime(boardNumber);
    this.#checkBoard = new CheckUserBoard(boardNumber);
    this.#errorsCounter = new CountUserErrors(boardNumber);

    this.#loadNewGame(boardNumber);
    this.#removeGameBoard(boardNumber);
    this.#saveCurrentBoard();

    this.#board.btnSolve.addEventListener('click', () =>
      this.#gameLogic.solveGame()
    );
    this.#board.puzzle.addEventListener('keyup', () =>
      this.#checkBoard.checkForPopupContent()
    );
  }

  initTheGame(board, errors, time) {
    this.#gameLogic.displayValuesInSudokuBoard(board);
    this.#errorsCounter.showUserErrors(errors);
    this.#timer.startNewTime(time);
  }

  #loadNewGame() {
    this.#board.btnLoad.addEventListener('click', () => {
      const response = confirm('Do you want to Load new Puzzle ?');
      if (response) {
        this.initTheGame();
      } else {
        return;
      }
    });
  }
  #removeGameBoard(board) {
    this.#board.removeBoard.addEventListener('click', () => {
      if (GetUserInformation.userGames.length) {
        const response = confirm('Do you want to delete this game ?');
        if (response) UserGameDataManager.deleteGame(this.#board.id);
      }
      const gameContainer = document.getElementById(`game-board-${board}`);
      gameContainer.remove();
      GameController.numGameBoards--;
      if (GameController.numGameBoards == 1) {
        newBoard.innerText = 'Game Board';
        newBoard.classList.remove('extra-boards');
        newBoard.classList.add('new-board-btn');
      }
    });
  }
  #saveCurrentBoard() {
    this.#board.btnSave.addEventListener('click', () => {
      const response = confirm('Do you want to save this game ?');
      if (response) {
        UserGameDataManager.saveGame(
          this.#board.id,
          this.#gameLogic.sudokuBoard,
          this.#errorsCounter.errorCounter.textContent,
          this.#timer.time
        );
        this.#timer.stopedTime();
      }
    });
  }
  static logOut() {
    LocalStorageHandler.removeUserData('currentUser');
    PopupController.loadingPopup('signupLogin.html');
  }
  static get userName() {
    const data = GetUserInformation.userData().user;
    userName.textContent = `for ${data.username}`;
    return userName.textContent;
  }
}

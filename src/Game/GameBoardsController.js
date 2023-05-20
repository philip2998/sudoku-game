import GameController from './GameController.js';
import { newBoard, logOut } from '../HtmlAndElements/selectedElements.js';
import GetUserInformation from '../services/GetUserInformation.js';
import ToggleActions from '../UIActions/ToggleActions.js';
import GameTime from './GameTime.js';

class GameBoardsController {
  constructor() {
    this.savedBoards = GetUserInformation.userGames;
    this.numOfSavedBoards = this.savedBoards.length;
    this.boardBtn = newBoard;
    this.numOfBoards = 0;
    this.time = new GameTime();
    GameController.userName;
    this.#createBoard();
    logOut.addEventListener('click', GameController.logOut);
  }

  #createBoard() {
    if (!this.savedBoards.length) {
      // If saved boards does not exist
      this.boardBtn.addEventListener('click', () => {
        const game = new GameController(this.numOfBoards);
        game.initTheGame();
        this.numOfBoards++;
        ToggleActions.toggleButtonText(this.numOfBoards > 1, this.boardBtn);
      });
    } else {
      this.savedBoards.forEach((userGame, numOfBoard) => {
        const game = new GameController(numOfBoard);
        game.initTheGame(userGame.board, userGame.errors, userGame.time);
      });
      this.boardBtn.addEventListener('click', () => {
        const game = new GameController(this.numOfSavedBoards);
        game.initTheGame();
        this.numOfSavedBoards++;
        ToggleActions.toggleButtonText(
          this.numOfSavedBoards > 1,
          this.boardBtn
        );
      });
    }
  }
}
new GameBoardsController();

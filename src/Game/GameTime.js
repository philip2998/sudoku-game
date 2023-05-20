import GameBoard from './GameBoard.js';
import PopupController from '../UIActions/PopupController.js';
import ToggleActions from '../UIActions/ToggleActions.js';

export default class GameTime extends GameBoard {
  constructor(id) {
    super(id);
    this.timeShow = document.getElementById(`time-${id}`);
    this.timerBoard = document.getElementById(`timer-board-${id}`);
    this.play = document.getElementById(`play-${id}`);
    this.pause = document.getElementById(`pause-${id}`);
    this.showPause = document.getElementById(`pause-message-${id}`);
    this.sudokuPuzzle = document.getElementById(`puzzle-${id}`);
    this.time = 10 * 60;
    this.timer = null;
  }

  _sudokuGameTime() {
    const tick = () => {
      const min = String(Math.floor(this.time / 60)).padStart(2, 0);
      const sec = String(this.time % 60).padStart(2, 0);
      // So we have min and sec, we can Display it
      // in our created HTML time
      this.timeShow.textContent = `${min}:${sec}`;
      if (this.time == 59) {
        this.timeShow.classList.add('limit-time');
      }
      // When the time runs out, we need to finish the game
      if (this.time == 0) {
        clearInterval(this.timer);
        PopupController.showPopup(
          `Your time is up ⏲️, You lose this ${this.id} Game, try again❗👇`
        );
      }
      // For timer of course we need to decrease time
      this.time--;
    };
    let isPlaying = false;
    tick();
    const startTimer = () => {
      this.timer = setInterval(tick, 1000);
      isPlaying = true;
      ToggleActions.togglePauseMessage(
        !isPlaying,
        this.showPause,
        this.sudokuPuzzle
      );
    };
    const stopTimer = () => {
      clearInterval(this.timer);
      isPlaying = false;
      ToggleActions.togglePauseMessage(
        !isPlaying,
        this.showPause,
        this.sudokuPuzzle
      );
    };
    startTimer();
    // We use icons for stop or start the timer
    this.timerBoard.addEventListener('click', () => {
      if (isPlaying) {
        stopTimer();
        ToggleActions.toggleIconDisplay(!isPlaying, this.pause, this.play);
      } else {
        startTimer();
        ToggleActions.toggleIconDisplay(!isPlaying, this.pause, this.play);
      }
    });
    // We use icon img for start the timer
    this.showPause.addEventListener('click', () => {
      startTimer();
      ToggleActions.toggleIconDisplay(!isPlaying, this.pause, this.play);
    });
  }
  // For new Game we need to clear exist time if it is exist
  // and set new game time
  startNewTime(time) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.time = time ?? 10 * 60;
    this._sudokuGameTime();
  }
  stopedTime() {
    let isPlaying = false;
    clearInterval(this.timer);
    ToggleActions.togglePauseMessage(
      !isPlaying,
      this.showPause,
      this.sudokuPuzzle
    );
  }
}

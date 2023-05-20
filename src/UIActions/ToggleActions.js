export default class ToggleActions {
  static togglePauseMessage(isDisplay = false, pauseMessage, puzzle) {
    pauseMessage.style.display = isDisplay ? 'block' : 'none';
    pauseMessage.style.pointerEvent = isDisplay ? 'auto' : 'none';
    puzzle.style.visibility = isDisplay ? 'hidden' : 'visible';
  }
  static toggleIconDisplay(isDisplay = false, pauseIcon, playIcon) {
    pauseIcon.style.display = isDisplay ? 'none' : 'flex';
    playIcon.style.display = isDisplay ? 'flex' : 'none';
  }
  static toggleButtonText(isMoreBoards = false, button) {
    button.innerText = isMoreBoards ? 'Extra Board' : 'Game Board';
    if (isMoreBoards) {
      button.classList.remove('new-board-btn');
      button.classList.add('extra-boards');
    }
  }
}

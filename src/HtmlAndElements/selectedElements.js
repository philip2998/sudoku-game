const btnClosePopup = document.querySelector('.popup-button');
const newBoard = document.querySelector('.new-board-btn');
const userName = document.querySelector('.user-name');
const logOut = document.querySelector('.logout-btn');

const initInstructions = document.querySelector('.init');
const gameSection = document.querySelector('.game-section');
const popup = document.querySelector('.popup');
const popupText = document.querySelector('.popup-content');
const overlay = document.querySelector('.overlay');
const loadingPopup = document.getElementById('loading-popup');

export {
  initInstructions,
  newBoard,
  userName,
  logOut,
  btnClosePopup,
  gameSection,
  popup,
  popupText,
  overlay,
  loadingPopup,
};

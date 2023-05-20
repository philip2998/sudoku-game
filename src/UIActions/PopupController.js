import {
  btnClosePopup,
  loadingPopup,
  overlay,
  popup,
  popupText,
} from '../HtmlAndElements/selectedElements.js';

export default class PopupController {
  static showPopup(message) {
    PopupController.openPopup();
    popupText.textContent = message;
    PopupController.setPopupCloseListeners();
  }
  // For a variety of some information we create popup
  // and it opens and closes depending on the situation
  static openPopup() {
    popup.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
  static loadingPopup(page) {
    loadingPopup.style.display = 'block';
    setTimeout(function () {
      loadingPopup.style.display = 'none';
      location.replace(page);
    }, 3000);
  }
  static closePopup() {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  static setPopupCloseListeners() {
    const closePopupHandler = () => PopupController.closePopup();
    btnClosePopup.addEventListener('click', closePopupHandler);
    overlay.addEventListener('click', closePopupHandler);
    document.addEventListener('keyup', e => {
      if (e.key == 'Escape' && !popup.classList.contains('hidden')) {
        closePopupHandler();
      }
    });
  }
}

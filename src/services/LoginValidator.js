import PopupController from '../UIActions/PopupController.js';
import LocalStorageHandler from './LocalStorageHandler.js';
import {
  loginEmailInput,
  loginPasswordInput,
} from '../HtmlAndElements/elementsFromLoginPage.js';

export default class LoginValidator {
  constructor() {
    this.isLoginValid = false;
  }

  loginValidation() {
    const loginEmail = loginEmailInput.value;
    const loginPassword = loginPasswordInput.value;

    if (loginEmail.trim() == '' || loginPassword.trim() == '') {
      PopupController.showPopup('Please fill in the input');
      this.isLoginValid = false;
      return;
    }

    const userData = LocalStorageHandler.getUserData(loginEmail);

    if (!userData) {
      PopupController.showPopup('Sorry, User with this email does not exist.');
      this.isLoginValid = false;
      return;
    }

    if (loginPassword != userData.user.password) {
      PopupController.showPopup('Sorry, Invalid password');
      this.isLoginValid = false;
      return;
    }
    this.isLoginValid = true;
  }
}

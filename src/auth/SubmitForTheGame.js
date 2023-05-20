import PopupController from '../UIActions/PopupController.js';
import LocalStorageHandler from '../services/LocalStorageHandler.js';
import SignupValidator from '../services/SignupValidator.js';
import LoginValidator from '../services/LoginValidator.js';
import UserData from './UserData.js';
import {
  emailInput,
  forms,
  loginEmailInput,
  signupForm,
  usernameInput,
} from '../HtmlAndElements/elementsFromLoginPage.js';

export default class SubmitForTheGame {
  constructor() {
    this.signup = new SignupValidator();
    this.login = new LoginValidator();
  }
  // And one we check if all inputs is valid
  // let's submit and store the user data in localStorage
  signupForTheGame() {
    this.signup.signupValidation();
    const email = emailInput.value;

    if (this.signup.isTheEmailExist(email)) {
      PopupController.showPopup(`
      Email address ${email} is already registered. 
      Please use a different email    
      `);
      return;
    }

    if (this.signup.isSignupValid) {
      LocalStorageHandler.setUserData(emailInput.value, new UserData());
      PopupController.showPopup(
        `Account created successfully. Thank you ${usernameInput.value}`
      );
      signupForm.reset();
      forms.classList.toggle('show-signup');
    }
  }
  loginForTheGame() {
    this.login.loginValidation();

    if (!this.login.isLoginValid) return;

    LocalStorageHandler.setUserData('currentUser', loginEmailInput.value);
    PopupController.loadingPopup('index.html');
  }
}

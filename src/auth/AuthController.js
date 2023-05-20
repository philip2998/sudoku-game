import { forms } from '../HtmlAndElements/elementsFromLoginPage.js';
import {
  signupForm,
  loginForm,
} from '../HtmlAndElements/elementsFromLoginPage.js';
import SignupLoginActions from '../UIActions/SignupLoginActions.js';
import SubmitForTheGame from './SubmitForTheGame.js';

export default class AuthController {
  constructor() {
    this.submit = new SubmitForTheGame();
    SignupLoginActions.checkStorageAndShowForm(forms);

    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      this.submit.signupForTheGame();
    });
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      this.submit.loginForTheGame();
    });
  }
}

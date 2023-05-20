import FormFieldHelper from '../UIActions/FormFieldHelper.js';
import LocalStorageHandler from './LocalStorageHandler.js';
import {
  usernameInput,
  usernameField,
  emailInput,
  emailField,
  passwordInput,
  passwordField,
  confirmPasswordInput,
  confirmPasswordField,
} from '../HtmlAndElements/elementsFromLoginPage.js';

export default class SignupValidator {
  constructor() {}

  signupValidation() {
    this._isTheNameExist();
    this._isTheEmailValid();
    this._isThePasswordValid();
    this._isTheConfirmedPasswordMatch();
    this._checkValidationByKeyEvent();
  }

  get isSignupValid() {
    return (
      !usernameField.classList.contains('invalid') &&
      !emailField.classList.contains('invalid') &&
      !passwordField.classList.contains('invalid') &&
      !confirmPasswordField.classList.contains('invalid')
    );
  }
  isTheEmailExist(email) {
    const existEmail = LocalStorageHandler.getUserData(email);
    return existEmail != null;
  }

  _isTheNameExist() {
    const isExist = usernameInput.value.trim() != '';
    FormFieldHelper.toggleInvalidClass(usernameField, 'invalid', !isExist);
  }
  // Start with email validation
  // We needs to know if it is valid email or not
  // by using regExp
  _isTheEmailValid() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailInvalid = !emailInput.value.match(emailPattern);
    FormFieldHelper.toggleInvalidClass(emailField, 'invalid', isEmailInvalid);
  }

  // For password validation we have our rule
  // that we use in our website, and also using regExp
  // for that password rule
  _isThePasswordValid() {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordInvalid = !passwordInput.value.match(passwordPattern);
    FormFieldHelper.toggleInvalidClass(
      passwordField,
      'invalid',
      isPasswordInvalid
    );
  }

  // Requiring a second-time password is a simple
  // but effective security measure that can help protect user's
  // accounts and sensitive information.
  _isTheConfirmedPasswordMatch() {
    const isMatch =
      passwordInput.value != confirmPasswordInput.value ||
      confirmPasswordInput.value == '';
    FormFieldHelper.toggleInvalidClass(
      confirmPasswordField,
      'invalid',
      isMatch
    );
  }

  _checkValidationByKeyEvent() {
    usernameInput.addEventListener('input', () => this._isTheNameExist());
    emailInput.addEventListener('input', () => this._isTheEmailValid());
    passwordInput.addEventListener('input', () => this._isThePasswordValid());
    confirmPasswordInput.addEventListener('input', () =>
      this._isTheConfirmedPasswordMatch()
    );
  }
}

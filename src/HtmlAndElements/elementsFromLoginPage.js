const forms = document.querySelector('.forms');
const passwordsShowHide = document.querySelectorAll('.eye-icon');
const links = document.querySelectorAll('.link');

const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form');

const loginEmailInput = document.querySelector('.email-login');
const loginPasswordInput = document.querySelector('.password-login');

const loginEmailField = document.querySelector('.login-email-field');
const loginPasswordField = document.querySelector('.login-password-field');

const usernameInput = signupForm.querySelector('.username');
const usernameField = signupForm.querySelector('.username-field');

const emailField = signupForm.querySelector('.email-field');
const emailInput = emailField.querySelector('.email');

const passwordField = signupForm.querySelector('.password-field');
const passwordInput = passwordField.querySelector('.password');

const confirmPasswordField = signupForm.querySelector(
  '.confirm-password-field'
);
const confirmPasswordInput = confirmPasswordField.querySelector('.cPassword');

const popup = document.querySelector('.popup');
const popupText = document.querySelector('.popup-content');
const overlay = document.querySelector('.overlay');

const loadingPopup = document.getElementById('loading-popup');

export {
  forms,
  passwordsShowHide,
  links,
  usernameInput,
  usernameField,
  signupForm,
  loginForm,
  loginEmailInput,
  loginPasswordInput,
  loginEmailField,
  loginPasswordField,
  emailField,
  emailInput,
  passwordField,
  passwordInput,
  confirmPasswordField,
  confirmPasswordInput,
  popup,
  popupText,
  overlay,
  loadingPopup,
};

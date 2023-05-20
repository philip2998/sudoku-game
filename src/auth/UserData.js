import {
  emailInput,
  passwordInput,
  usernameInput,
} from '../HtmlAndElements/elementsFromLoginPage.js';

export default class UserData {
  constructor() {
    this.user = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      userGames: [],
    };
  }
}

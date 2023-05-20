import PopupController from '../UIActions/PopupController.js';
import LocalStorageHandler from './LocalStorageHandler.js';

export default class GetUserInformation {
  static currentUser() {
    const currentUser = LocalStorageHandler.getUserData('currentUser');
    return currentUser != null
      ? currentUser
      : location.replace('signupLogin.html');
  }

  static userData() {
    return LocalStorageHandler.getUserData(GetUserInformation.currentUser());
  }

  static get userGames() {
    const userGames = GetUserInformation.userData().user.userGames;
    return userGames;
  }
}

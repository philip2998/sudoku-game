export default class LocalStorageHandler {
  static getUserData(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static setUserData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeUserData(key) {
    localStorage.removeItem(key);
  }
}

import LocalStorageHandler from './LocalStorageHandler.js';
import GetUserInformation from './GetUserInformation.js';

export default class UserGameDataManager {
  static saveGame(boardId, boardData, errors, gameTime) {
    const userData = GetUserInformation.userData();
    const gameData = {
      id: boardId,
      board: boardData,
      errors: errors,
      time: gameTime,
    };
    const gameIndex = userData.user.userGames.findIndex(
      game => game.id == boardId
    );
    if (gameIndex != -1) {
      // Update the existing game data with the matching boardId in the user's userGames array
      userData.user.userGames[gameIndex] = gameData;
    } else {
      // Push game data information to the user's userGames array if it doesn't exist already
      userData.user.userGames.push(gameData);
    }
    LocalStorageHandler.setUserData(GetUserInformation.currentUser(), userData);
  }
  static deleteGame(boardId) {
    const userData = GetUserInformation.userData();
    const gameIndex = userData.user.userGames.findIndex(
      game => game.id == boardId
    );
    if (gameIndex != -1) {
      // Remove the game data with the matching boardId from the user's userGames array
      userData.user.userGames.splice(gameIndex, 1);
      LocalStorageHandler.setUserData(
        GetUserInformation.currentUser(),
        userData
      );
    }
  }
}

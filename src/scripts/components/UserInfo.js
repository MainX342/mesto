export default class UserInfo {
  constructor (configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileDescription = document.querySelector(configInfo.profileDescriptionSelector);
  }

  getUserInfo () {
    return {
      username: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
  }

  setUserInfo (userData) {
    this._profileName.textContent = userData.username;
    this._profileDescription.textContent = userData.description;
  }
}

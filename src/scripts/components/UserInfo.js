export default class UserInfo {
  constructor (configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileDescription = document.querySelector(configInfo.profileDescriptionSelector);
    this._profileAvatar = document.querySelector(configInfo.profileAvatarSelector);
  }

  getUserInfo () {
    return {
      username: this._profileName.textContent,
      description: this._profileDescription.textContent
    }
  }

  setUserInfo({ username, description, avatar }) {
    if (username) {
      this._profileName.textContent = username;
    }
    if (description) {
      this._profileDescription.textContent = description;
    }
    if (avatar) {
      this._profileAvatar.src = avatar;
    }
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleCLoseButton = () => {
      this.close();
    }

  _handleClickByOverlay = (e) => {
      if (e.target === e.currentTarget) {
        this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClickByOverlay);
    this._closeButton.addEventListener('click', this._handleCLoseButton);
  }
}

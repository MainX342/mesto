import Popup from "./Popup.js";

export default class PopupWithDeleteForm extends Popup{
  constructor (popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save-btn');
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitForm({ card: this._card, cardId: this._cadrId })
    })
  }

  setDeleteButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  open = ({ card, cardId }) => {
    super.open()
    this._card = card;
    this._cadrId = cardId;
  }
}

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save-btn');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setInputValues(formValues) {
    this._inputList.forEach(input => {
      input.value = formValues[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitForm(this._getInputValues());
    });
  }

  setButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}

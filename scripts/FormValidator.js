export class FormValidator {
  constructor (config, form) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorTemplate = config.inputErrorTemplate
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = form;
    this._buttonElement = form.querySelector(config.submitButtonSelector);
    this._inputList = form.querySelectorAll(config.inputSelector);
  }

  _showInputError = (inputElement, errorElement) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasValidInput = () => {
    return Array.from(this._inputList).every((inputElement) => inputElement.validity.valid);
  }

  _enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _disableButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _toggleButtonState = () => {
    if (this._hasValidInput()) {
      this._enableButton();
    }
    else {
      this._disableButton();
    }
  }

  _checkInputValidity = (inputElement) => {
    const errorElement = this._form.querySelector(`${this._inputErrorTemplate}_${inputElement.id}`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  resetErrorsOnOpen = () => {
    this._inputList.forEach(inputElement => {
      const errorElement = this._form.querySelector(`${this._inputErrorTemplate}_${inputElement.id}`);
      if (!inputElement.validity.valid) {
        this._hideInputError(inputElement, errorElement);
      }
    })
    this._disableButton ()
  }
};

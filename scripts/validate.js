const configValidation = {
  allForms: document.forms,
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorTemplate: '.popup__error_type',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//const { allForms, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorTemplate, inputErrorClass, errorClass } = configValidation;

const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const hasValidInput = (inputList) => {
  return Array.from(inputList).every((inputElement) => inputElement.validity.valid);
}

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasValidInput(inputList)) {
    enableButton(buttonElement, inactiveButtonClass);
  }
  else {
    disableButton(buttonElement, inactiveButtonClass);
  }
}

const checkInputValidity = (inputElement, inputErrorTemplate, inputErrorClass, errorClass) => {
  const errorElement = document.querySelector(`${inputErrorTemplate}_${inputElement.id}`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
}

const setEventListeners = (inputList, buttonElement, inactiveButtonClass, inputErrorTemplate, inputErrorClass, errorClass) => {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, inputErrorTemplate, inputErrorClass, errorClass)
      toggleButtonState(inputList, buttonElement, inactiveButtonClass)
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(config.allForms);
  formList.forEach((formElement) => {
    const inputList = formElement.querySelectorAll(config.inputSelector)
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    setEventListeners(inputList, buttonElement, config.inactiveButtonClass, config.inputErrorTemplate, config.inputErrorClass, config.errorClass);
  });
};

enableValidation(configValidation);

const resetErrorsOnOpen = (formList) => {
  formList.querySelectorAll(configValidation.inputSelector).forEach((inputElement) => {
    const errorElement = formList.querySelector(`${configValidation.inputErrorTemplate}_${inputElement.id}`);
    const buttonElement = formList.querySelector(configValidation.submitButtonSelector);
    if (!inputElement.validity.valid) {
      hideInputError(inputElement, errorElement, configValidation.inputErrorClass, configValidation.errorClass);
      disableButton (buttonElement, configValidation.inactiveButtonClass);
    }
  })
}

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

const { allForms, formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorTemplate, inputErrorClass, errorClass } = configValidation;

const showInputError = (inputElement, errorElement) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (inputElement, errorElement) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const hasValidInput = (inputList) => {
  return Array.from(inputList).every((inputElement) => inputElement.validity.valid);
}

const enableButton = (buttonElement) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

const disableButton = (buttonElement) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    enableButton(buttonElement);
  }
  else {
    disableButton(buttonElement);
  }
}

const checkInputValidity = (inputElement) => {
  const errorElement = document.querySelector(`${inputErrorTemplate}_${inputElement.id}`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement);
  } else {
    hideInputError(inputElement, errorElement);
  }
}

const setEventListeners = (inputList, buttonElement) => {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(allForms);
  formList.forEach((formElement) => {
    const inputList = formElement.querySelectorAll(inputSelector)
    const buttonElement = formElement.querySelector(submitButtonSelector);
    setEventListeners(inputList, buttonElement);
  });
};

enableValidation(configValidation);

const resetErrorsOnOpen = (formList) => {
  formList.querySelectorAll(inputSelector).forEach((inputElement) => {
    const errorElement = formList.querySelector(`${inputErrorTemplate}_${inputElement.id}`);
    const buttonElement = formList.querySelector(submitButtonSelector);
    if (!inputElement.validity.valid) {
      hideInputError(inputElement, errorElement);
      disableButton (buttonElement);
    }
  })
}

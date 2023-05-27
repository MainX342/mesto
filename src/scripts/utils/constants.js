// Объект для валидации
const configValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorTemplate: '.popup__error_type',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Объект для пользователя
const configInfo = {
  profileNameSelector: ".profile__info-name",
  profileDescriptionSelector: ".profile__info-description",
  profileAvatarSelector: ".profile__avatar",
}

const buttonOpenEditAvatarPopup = document.querySelector(".profile__avatar-edit");
const buttonOpenEditInfoPopup = document.querySelector(".profile__info-edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-btn");
const cardsContainerSelector = '.elements__list';
const popupEditAvatarSelector = '.popup_edit-avatar';
const popupProfileSelector = '.popup_profile-edit';
const popupAddCardSelector = '.popup_add-card';
const popupImageSelector = '.popup_image';
const popupDeleteCardSelector = '.popup_delete-card';
const formsValidator = {};

export {
  configValidation,
  configInfo,
  buttonOpenEditAvatarPopup,
  buttonOpenEditInfoPopup,
  buttonOpenAddCardPopup,
  cardsContainerSelector,
  popupEditAvatarSelector,
  popupProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  popupDeleteCardSelector,
  formsValidator
};

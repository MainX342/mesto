// Начальные карточки мест
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
}

const profileForm = document.querySelector(".popup__form_edit");
const cardForm = document.querySelector(".popup__form_add");
const buttonOpenEditInfoPopup = document.querySelector(".profile__info-edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-btn");
const cardsContainerSelector = '.elements__list';
const popupProfileSelector = '.popup_profile-edit';
const popupAddCardSelector = '.popup_add-card';
const popupImageSelector = '.popup_image';

export { initialCards, configValidation, configInfo, profileForm, cardForm, buttonOpenEditInfoPopup, buttonOpenAddCardPopup, cardsContainerSelector, popupProfileSelector, popupAddCardSelector, popupImageSelector };

import { initialCards, configValidation } from "./constants.js"
import { openPopup, closePopup, handleOpenPopupImage } from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupProfile = document.querySelector(".popup_profile-edit");
const popupAddCard = document.querySelector(".popup_add-card");
const popupImage = document.querySelector(".popup_image");
const buttonOpenEditInfoPopup = document.querySelector(".profile__info-edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-btn");
//const buttonCloseEditInfoPopup = document.querySelector(".popup__close-btn_profile");
//const buttonCloseAddCardPopup = document.querySelector(".popup__close-btn_card");
//const buttonCloseImagePopup = document.querySelector(".popup__close-btn_image");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const profileForm = document.querySelector(".popup__form_edit");
const popupInputName = document.querySelector(".popup__input_field_name");
const popupInputDescription = document.querySelector(
  ".popup__input_field_description"
);
const cardForm = document.querySelector(".popup__form_add");
const popupInputCardTitle = document.querySelector(
  ".popup__input_field_name-place"
);
const popupInputCardImage = document.querySelector(".popup__input_field_link");
const cardsContainer = document.querySelector(".elements__list");
const popupList = document.querySelectorAll(".popup");

// Получение данных профиля со страницы
const initProfileForm = () => {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
};

// Установка данных профиля из инпутов
const setProfileInfo = () => {
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
};

// Очистка формы добавления карточек
const clearCardInput = () => {
  cardForm.reset();
  cardFormValidation.resetErrorsOnOpen();
};

// Очистка формы редактирования профиля
const clearProfileInput = () => {
  profileForm.reset();
  profileFormValidation.resetErrorsOnOpen();
}

// Открытие попапа редактирования профиля
const handleOpenProfilePopup = () => {
  clearProfileInput();
  initProfileForm();
  openPopup(popupProfile);
};

// Открытие попапа добавления карточки
const handleOpenAddCardPopup = () => {
  clearCardInput();
  openPopup(popupAddCard);
};

// Сабмит редактирования профиля
const handleProfileFormSubmit = (e) => {
  closePopup(popupProfile);
  setProfileInfo();
  e.preventDefault();
};

// Функция создания новой карточки
const createCard = (cardData) => {
  const card = new Card (cardData, '#card', handleOpenPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
};

// Функция добавления карточки в контейнер
const addCardInContainer = (container, card) => {
  container.prepend(card);
}

// Добавление начальных карточек
initialCards.forEach((item) => {
  addCardInContainer(cardsContainer, createCard(item));
});

// Сабмит добавления карточки
const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const newCardCreate = createCard({
    name: popupInputCardTitle.value,
    link: popupInputCardImage.value
  });
  addCardInContainer(cardsContainer, newCardCreate);
  closePopup(popupAddCard);
};

// Включение валидации для редактирования профиля
const profileFormValidation = new FormValidator(configValidation, profileForm);
profileFormValidation.enableValidation();


// Включение валидации для добавления карточек
const cardFormValidation = new FormValidator(configValidation, cardForm);
cardFormValidation.enableValidation();

// Закрытие попапов по клику на оверлей
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
  const closeButton = popup.querySelector('.popup__close-btn');
  closeButton.addEventListener("click", () => closePopup(popup));

});

// Слушатели
buttonOpenEditInfoPopup.addEventListener("click", handleOpenProfilePopup);
buttonOpenAddCardPopup.addEventListener("click", handleOpenAddCardPopup);
//buttonCloseEditInfoPopup.addEventListener("click", () => closePopup(popupProfile));
//buttonCloseAddCardPopup.addEventListener("click", () => closePopup(popupAddCard));
//buttonCloseImagePopup.addEventListener("click", () => closePopup(popupImage));
cardForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

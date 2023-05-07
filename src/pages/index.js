import './index.css';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { initialCards, configValidation, configInfo, profileForm, cardForm, buttonOpenEditInfoPopup, buttonOpenAddCardPopup, cardsContainerSelector, popupProfileSelector, popupAddCardSelector, popupImageSelector } from "../scripts/utils/constants.js";

// Включение валидации для редактирования профиля
const profileFormValidation = new FormValidator(configValidation, profileForm);
profileFormValidation.enableValidation();

// Включение валидации для добавления карточек
const cardFormValidation = new FormValidator(configValidation, cardForm);
cardFormValidation.enableValidation();

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card (cardData, '#card', popupImage.open);
    const cardElement = card.generateCard();
    return cardElement;
  }
}, cardsContainerSelector);
section.renderItems()

const popupProfileForm = new PopupWithForm(popupProfileSelector, (items) => {
  userInfo.setUserInfo(items);
});

const popupAddCardForm = new PopupWithForm(popupAddCardSelector, (items) => {
  section.addItem(items);
});

// Открытие попапа редактирования профиля
const handleOpenProfilePopup = () => {
  profileFormValidation.resetErrorsOnOpen();
  popupProfileForm.setInputValues(userInfo.getUserInfo());
  popupProfileForm.open();
};

// // Открытие попапа добавления карточки
const handleOpenAddCardPopup = () => {
  cardFormValidation.resetErrorsOnOpen()
  popupAddCardForm.open();
};

// Слушатели
popupImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
buttonOpenEditInfoPopup.addEventListener("click", handleOpenProfilePopup);
buttonOpenAddCardPopup.addEventListener("click", handleOpenAddCardPopup);

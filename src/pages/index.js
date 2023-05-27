import './index.css';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Api from '../scripts/components/Api.js';
import {
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
} from "../scripts/utils/constants.js";

// Экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '6ca2f4db-76f0-4668-af2d-24d84bc892a5',
    'Content-Type': 'application/json'
  }
});

// Валидация всех форм
Array.from(document.forms).forEach(formElement => {
  const validator  = new FormValidator(configValidation, formElement);
  const formName = formElement.getAttribute('name');
  formsValidator[formName] = validator ;
  validator.enableValidation();
})

const userInfo = new UserInfo(configInfo);

const popupProfileForm = new PopupWithForm(popupProfileSelector, async (items) => {
  try {
    const res = await api.setUserInfo(items);
    userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar });
    popupProfileForm.close();
  } catch (error) {
    console.error(`Ошибка при редактировании профиля ${error}`);
  } finally {
    popupProfileForm.setButtonText();
  }
});

const popupEditAvatarForm = new PopupWithForm(popupEditAvatarSelector, async (items) => {
  try {
    const res = await api.setUserAvatar(items);
    userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar });
    popupEditAvatarForm.close();
  } catch (error) {
    console.error(`Ошибка при обновлении аватара ${error}`);
  } finally {
    popupEditAvatarForm.setButtonText();
  }
});

const popupAddCardForm = new PopupWithForm(popupAddCardSelector, async (items) => {
  try {
    const cardData = await api.addNewCardToServer(items);
    cardData.myid = userInfo.getUserId();
    section.addItem(creatNewCard(cardData));
    popupAddCardForm.close();
  } catch (error) {
    console.error(`Ошибка при создании карточки ${error}`);
  } finally {
    popupAddCardForm.setButtonText();
  }
});

const popupDeleteCardForm = new PopupWithConfirmation(popupDeleteCardSelector, async ({ card, cardId }) => {
  try {
    await api.deleteCardFromServer(cardId);
    card.deleteCard();
    popupDeleteCardForm.close();
  } catch (error) {
    console.error(`Ошибка при удалении карточки ${error}`);
  } finally {
    popupDeleteCardForm.setButtonText();
  }
});

const popupImage = new PopupWithImage(popupImageSelector);

function creatNewCard(data) {
  try {
    const card = new Card(data, '#card', popupImage.open, popupDeleteCardForm.open, async (cardLikeElement, cardId) => {
  try {
  if (cardLikeElement.classList.contains('elements__like_active')) {
    const res = await api.deleteLike(cardId);
    card.toggleLike(res.likes);
  } else {
    const res = await api.addLike(cardId);
    card.toggleLike(res.likes);
  }
  } catch (error) {
    console.error(`Ошибка при изменении лайка ${error}`);
  }
  });
    const cardElement = card.generateCard();
    return cardElement;
  } catch (error) {
    console.error(`Ошибка при создании новой карточки ${error}`);
  }
}

const section = new Section(async (cardData) => {
  section.addItem(await creatNewCard(cardData));
}, cardsContainerSelector);

// Открытие попапа редактирования профиля
const handleOpenProfilePopup = () => {
  formsValidator['popup-form-edit'].resetErrorsOnOpen();
  popupProfileForm.setInputValues(userInfo.getUserInfo());
  popupProfileForm.open();
};

// Открытие попапа добавления карточки
const handleOpenAddCardPopup = () => {
  formsValidator['popup-form-add'].resetErrorsOnOpen();
  popupAddCardForm.open();
};

// Открытие попапа редактирования аватара
const handleOpenEditAvatarPopup = () => {
  formsValidator['popup-avatar-edit'].resetErrorsOnOpen();
  popupEditAvatarForm.open();
};

// Слушатели
popupImage.setEventListeners();
popupProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupEditAvatarForm.setEventListeners();
popupDeleteCardForm.setEventListeners();
buttonOpenEditInfoPopup.addEventListener("click", handleOpenProfilePopup);
buttonOpenAddCardPopup.addEventListener("click", handleOpenAddCardPopup);
buttonOpenEditAvatarPopup.addEventListener("click", handleOpenEditAvatarPopup);


async function loadInitialData() {
  try {
    const [userData, cardData] = await Promise.all([api.getInfo(), api.getInitialCards()]);
    cardData.forEach(element => element.myid = userData._id);
    userInfo.setUserInfo({ username: userData.name, description: userData.about, avatar: userData.avatar });
    userInfo.setUserId(userData._id);
    section.renderItems(cardData.reverse());
  } catch (error) {
    console.error(`Ошибка при создании начальных данных ${error}`);
  }
}

loadInitialData();

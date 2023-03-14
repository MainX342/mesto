// Переменные
const popupProfile = document.querySelector(".popup_profile-edit");
const popupAddCard = document.querySelector(".popup_add-card");
const popupImage = document.querySelector(".popup_image");
const buttonOpenEditInfoPopup = document.querySelector(".profile__info-edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-btn");
const buttonCloseEditInfoPopup = document.querySelector(
  ".popup__close-btn_profile"
);
const buttonCloseAddCardPopup = document.querySelector(
  ".popup__close-btn_card"
);
const buttonCloseImagePopup = document.querySelector(".popup__close-btn_image");
const closePopupButton = document.querySelectorAll(".popup__close-btn"); // удалить
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const profileForm = document.querySelector(".popup__form_edit");
const cardForm = document.querySelector(".popup__form_add");
const popupInputName = document.querySelector(".popup__input_field_name");
const popupInputDescription = document.querySelector(
  ".popup__input_field_description"
);
const popupInputCardTitle = document.querySelector(
  ".popup__input_field_name-place"
);
const popupInputCardImage = document.querySelector(".popup__input_field_link");
const cardTemplate = document.querySelector("#card").content;
const cardTemplateElement = cardTemplate.querySelector(".elements__card");
const cardList = document.querySelector(".elements__list");
const popupEnlargedImage = document.querySelector(".popup__image-enlarged");
const popupImageFigcaption = document.querySelector(".popup__image-figcaption");

// Функции
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const getProfileInfo = () => {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
};

const setProfileInfo = () => {
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
};

const clearCardInput = () => {
  popupInputCardTitle.value = "";
  popupInputCardImage.value = "";
};

const handleProfilePopup = () => {
  openPopup(popupProfile);
  getProfileInfo();
};
const handleAddCardPopup = () => {
  openPopup(popupAddCard);
  clearCardInput();
};
const handleCloseProfilePopup = () => closePopup(popupProfile);
const handleCloseAddCardPopup = () => closePopup(popupAddCard);
const handleCloseImagePopup = () => closePopup(popupImage);

const handleCloseProfilePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  handleCloseProfilePopup();
};
const handleCloseAddCardPopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  handleCloseAddCardPopup();
};
const handleCloseImagePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  handleCloseImagePopup();
};

const handleProfileFormSubmit = (e) => {
  closePopup(popupProfile);
  setProfileInfo();
  e.preventDefault();
};

const handleCardFormSubmit = (e) => {
  closePopup(popupAddCard);
  const newCardCreate = createCard({
    name: popupInputCardTitle.value,
    link: popupInputCardImage.value,
  });
  cardList.prepend(newCardCreate);
  e.preventDefault();
};

const createCard = (cardData) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardLike = cardElement.querySelector(".elements__like");
  const cardDelete = cardElement.querySelector(".elements__delete-btn");
  const cardImage = cardElement.querySelector(".elements__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".elements__title").textContent = cardData.name;
  cardLike.addEventListener("click", () =>
    cardLike.classList.toggle("elements__like_active")
  );
  cardDelete.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    openPopup(popupImage);
    popupEnlargedImage.src = cardData.link;
    popupEnlargedImage.alt = `${cardData.name}: увеличенное изображение`;
    popupImageFigcaption.textContent = cardData.name;
  });
  return cardElement;
};

initialCards.forEach((element) => {
  const newCard = createCard(element);
  cardList.append(newCard);
});

// Слушатели
buttonOpenEditInfoPopup.addEventListener("click", handleProfilePopup);
buttonOpenAddCardPopup.addEventListener("click", handleAddCardPopup);
buttonCloseEditInfoPopup.addEventListener("click", handleCloseProfilePopup);
buttonCloseAddCardPopup.addEventListener("click", handleCloseAddCardPopup);
buttonCloseImagePopup.addEventListener("click", handleCloseImagePopup);
popupProfile.addEventListener("click", handleCloseProfilePopupByClickOnOverlay);
popupAddCard.addEventListener("click", handleCloseAddCardPopupByClickOnOverlay);
popupImage.addEventListener("click", handleCloseImagePopupByClickOnOverlay);
cardForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

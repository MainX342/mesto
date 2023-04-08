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
const cardsContainer = document.querySelector(".elements__list");
const popupEnlargedImage = document.querySelector(".popup__image-enlarged");
const popupImageFigcaption = document.querySelector(".popup__image-figcaption");
const popupList = document.querySelectorAll(".popup");

// Функции
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEscape);
};

const initProfileForm = () => {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
};

const setProfileInfo = () => {
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
};

const clearCardInput = () => {
  cardForm.reset();
  resetErrorsOnOpen(cardForm);
};

const clearProfileInput = () => {
  profileForm.reset();
  resetErrorsOnOpen(profileForm);
}

const handleOpenProfilePopup = () => {
  clearProfileInput();
  initProfileForm();
  openPopup(popupProfile);
};
const handleOpenAddCardPopup = () => {
  clearCardInput();
  openPopup(popupAddCard);
};

popupList.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closePopup(popup);
  });
})

const closePopupByEscape = (e) => {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

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
  cardsContainer.prepend(newCardCreate);
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
  cardsContainer.append(newCard);
});

// Слушатели
buttonOpenEditInfoPopup.addEventListener("click", handleOpenProfilePopup);
buttonOpenAddCardPopup.addEventListener("click", handleOpenAddCardPopup);
buttonCloseEditInfoPopup.addEventListener("click", () =>
  closePopup(popupProfile)
);
buttonCloseAddCardPopup.addEventListener("click", () =>
  closePopup(popupAddCard)
);
buttonCloseImagePopup.addEventListener("click", () => closePopup(popupImage));
cardForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

// popups windows
const popupEditWindow = document.querySelector(".popup_profile-edit");
const popupAddWindow = document.querySelector(".popup_add-card");
const popupImageWindow = document.querySelector(".popup_image");

// open popups
const openEditInfoPopupButton = document.querySelector(".profile__info-edit");
const openAddCardPopupButton = document.querySelector(".profile__add-btn");

const openPopupEditWindow = () => {
  popupEditWindow.classList.add("popup_opened");
  popupName.value = infoName.textContent;
  popupDescription.value = infoDescription.textContent;
};

const openAddPopupWindow = () => popupAddWindow.classList.add("popup_opened");

openEditInfoPopupButton.addEventListener("click", openPopupEditWindow);
openAddCardPopupButton.addEventListener("click", openAddPopupWindow);

// close popups
const closePopupButton = document.querySelectorAll(".popup__close-btn");

const closePopupWindow = () => {
  popupEditWindow.classList.remove("popup_opened");
  popupAddWindow.classList.remove("popup_opened");
  popupImageWindow.classList.remove("popup_opened");
};

const closePopupByClickOnOverlay = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closePopupWindow();
};

closePopupButton.forEach((button) => {
  button.addEventListener("click", closePopupWindow);
});

popupEditWindow.addEventListener("click", closePopupByClickOnOverlay);
popupAddWindow.addEventListener("click", closePopupByClickOnOverlay);
popupImageWindow.addEventListener("click", closePopupByClickOnOverlay);

// profile edit info and popups
const infoName = document.querySelector(".profile__info-name");
const infoDescription = document.querySelector(".profile__info-description");
const submitForm = document.querySelector(".popup__form_edit");
const popupName = document.querySelector(".popup__input_field_name");
const popupDescription = document.querySelector(
  ".popup__input_field_description"
);

const saveData = (e) => {
  popupEditWindow.classList.toggle("popup_opened");
  infoName.textContent = popupName.value;
  infoDescription.textContent = popupDescription.value;
  e.preventDefault();
};

submitForm.addEventListener("submit", saveData);

// save card button
const submitAddForm = document.querySelector(".popup__form_add");
const cardInputTitle = document.querySelector(".popup__input_field_name-place");
const cardInputImage = document.querySelector(".popup__input_field_link");

const saveCard = (e) => {
  popupAddWindow.classList.toggle("popup_opened");
  let createNewCard = createCard({
    name: cardInputTitle.value,
    link: cardInputImage.value,
  });
  document.querySelector(".elements__list").prepend(createNewCard);
  e.preventDefault();
};

submitAddForm.addEventListener("submit", saveCard);

// 6 baseline cards
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

// create card function
const createCard = (card) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const cardLike = cardElement.querySelector(".elements__like");
  const cardDelete = cardElement.querySelector(".elements__delete-btn");
  cardElement.querySelector(".elements__image").src = card.link;
  cardElement.querySelector(".elements__image").alt = card.name;
  cardElement.querySelector(".elements__title").textContent = card.name;
  cardLike.addEventListener("click", () =>
    cardLike.classList.toggle("elements__like_active")
  );
  cardDelete.addEventListener("click", () =>
    cardDelete.closest(".elements__card").remove()
  );
  cardElement
    .querySelector(".elements__image")
    .addEventListener("click", () => {
      popupImageWindow.classList.add("popup_opened");
      const popupImage = document.querySelector(".popup__image-enlarged");
      const popupImageFigcaprion = document.querySelector(
        ".popup__image-figcaption"
      );
      console.log(popupImageFigcaprion);
      popupImage.src = card.link;
      popupImage.alt = `${card.name}: увеличенное изображение`;
      popupImageFigcaprion.textContent = card.name;
    });
  return cardElement;
};

initialCards.forEach((element) => {
  let newCard = createCard(element);
  document.querySelector(".elements__list").append(newCard);
});

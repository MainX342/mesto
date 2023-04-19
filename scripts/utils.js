// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEscape);
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEscape);
};

// Закрытие попапов по нажатию Escape
const closePopupByEscape = (e) => {
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

// Открытие попапа с увеличенной картинкой
const handleOpenPopupImage = (cardData) => {
  const popupImageFigcaption = document.querySelector(".popup__image-figcaption");
  const popupEnlargedImage = document.querySelector(".popup__image-enlarged");
  const popupImage = document.querySelector(".popup_image");
  popupEnlargedImage.src = cardData.link;
  popupEnlargedImage.alt = `${cardData.name}: увеличенное изображение`;
  popupImageFigcaption.textContent = cardData.name;
  openPopup(popupImage);
}

export { openPopup, closePopup, handleOpenPopupImage };

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup_image");
    this._popupImageFigcaption = this._popup.querySelector(".popup__image-figcaption");
    this._popupEnlargedImage = this._popup.querySelector(".popup__image-enlarged");
  }

  open = (cardData) => {
    this._popupEnlargedImage.src = cardData.link;
    this._popupEnlargedImage.alt = `${cardData.name}: увеличенное изображение`;
    this._popupImageFigcaption.textContent = cardData.name;
    super.open();
  }
}

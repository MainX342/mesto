export class Card {
  constructor (cardData, templateSelector, handleOpenPopupImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleLike = () => {
    this._cardLike.classList.toggle("elements__like_active");
  }

  _handleOpenEnlargedImagePopup = () => {
    handleOpenPopupImage({
      name: this._name,
      link: this._link
    })
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', this._handleOpenEnlargedImagePopup);
    this._cardDelete.addEventListener('click', this._handleDeleteCard);
    this._cardLike.addEventListener('click', this._handleLike);
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardDelete = this._element.querySelector(".elements__delete-btn");
    this._cardLike = this._element.querySelector(".elements__like");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;

    return this._element;
  }
}

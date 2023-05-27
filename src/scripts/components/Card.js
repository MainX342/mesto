export default class Card {
  constructor (cardData, templateSelector, handleOpenPopupImage, handleOpenDeletePopup, switchLikeStatus) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._myId = cardData.myid;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._likesArrLength = cardData.likes.length;
    this._switchLikeStatus = switchLikeStatus;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImage = handleOpenPopupImage;
    this._handleOpenDeletePopup = handleOpenDeletePopup;
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
    this._handleOpenDeletePopup({ card: this, cardId: this._cardId });
  }

  _handleLike = () => {
    this._switchLikeStatus(this._cardLike, this._cardId);
  }

  _handleOpenEnlargedImagePopup = () => {
    this._handleOpenPopupImage({
      name: this._name,
      link: this._link
    })
  }

  _checkOwnerForDeleteButton = () => {
    this._myId === this._ownerId ? this._cardDelete.classList.remove('elements__delete-btn_hidden') : this._cardDelete.classList.add('elements__delete-btn_hidden');
  }

  _checkLikeStatus = () => {
    this._likes.forEach(element => {
      if (element._id === this._myId) {
        this._cardLike.classList.add("elements__like_active");
        return;
      }
    })
    this._likesCounter.textContent = this._likesArrLength;
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', this._handleOpenEnlargedImagePopup);
    this._cardDelete.addEventListener('click', this._handleDeleteCard);
    this._cardLike.addEventListener('click', this._handleLike);
  }

  toggleLike = (likes) => {
    this._cardLike.classList.toggle("elements__like_active");
    this._likesCounter.textContent =likes.length;
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardDelete = this._element.querySelector(".elements__delete-btn");
    this._cardLike = this._element.querySelector(".elements__like");
    this._cardTitle = this._element.querySelector(".elements__title");
    this._likesCounter = this._element.querySelector(".elements__like-counter");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._checkOwnerForDeleteButton();
    this._checkLikeStatus();
    return this._element;
  }
}

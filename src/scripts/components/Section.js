export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(cardData) {
    cardData.forEach(item => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

let openPopupButton = document.querySelector(".profile__info-edit");
let closePopupButton = document.querySelector(".popup__close-btn");
let submitForm = document.querySelector(".popup__form");
let popupWindow = document.querySelector(".popup");
let infoName = document.querySelector(".profile__info-name");
let infoDescription = document.querySelector(".profile__info-description");
let popupName = document.querySelector(".popup__input_field_name");
let popupDescription = document.querySelector(
  ".popup__input_field_description"
);

function togglePopup() {
  popupWindow.classList.toggle("popup_opened");
  popupName.value = infoName.textContent;
  popupDescription.value = infoDescription.textContent;
}

openPopupButton.addEventListener("click", togglePopup);

closePopupButton.addEventListener("click", togglePopup);

function saveData(e) {
  popupWindow.classList.toggle("popup_opened");
  infoName.textContent = popupName.value;
  infoDescription.textContent = popupDescription.value;
  e.preventDefault();
  console.log(infoName);
  console.log(infoDescription);
}

submitForm.addEventListener("submit", saveData);

/*
let likeButton = document.querySelectorAll(".elements__like");
likeButton.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like_active");
  });
});
*/

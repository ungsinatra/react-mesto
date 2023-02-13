export const initialCards = [
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
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
];

export const selectors = {
  // popup
  popup: ".popup",
  popupProfile: ".popup_use_profile",
  popupCard: ".popup_use_card",
  popupImg: ".popup_use_img",
  popupAvatar: ".popup_use_avatar-update",
  form: ".popup__form",
  popupInput: ".popup__input",
  inputName: ".popup__input_value_name",
  inputDesc: ".popup__input_value_desc",
  inputLink: ".popup__input_value_link",
  closeBtn: ".popup__close-btn",
  popupImage: ".popup__img",
  popupImgHeading: ".popup__desc",
  popupOpen: "popup__opened",
  // PROFILE
  profile: ".profile",
  name: ".profile__name",
  work: ".profile__description",
  editBtn: ".profile__edit-btn",
  addBnt: ".profile__add-btn",
  avatarEditButton:'.profile__avatar-switch-ican',
  avatarInput:'.popup__input_value_link',
  //template
  template: "#card-tmp",
  cardItem: ".place__item",
  cardImage: "place__img",
  cardLikeBtn: ".place__btn-like",
  cardDellBtn: ".place__btn-del",
  //place
  place: ".place",
  placeContainer: ".place__container",
  placeImg: ".place__img",
  
};
export const cardSelectors = {
  cardItem: ".place__item",
  cardImg: ".place__img",
  cardTitle: ".place__title",
  cardLikeBtnActive: "place__btn-like_status_liked",
  like: "place__btn-like",
  likeButton: ".place__btn-like",
  popupImg: ".popup_use_img",
  remove: "place__btn-del",
  removeButton:'.place__btn-del',
  likeCount:'.place__like-count'
};

export const popupSelecors = {
  popupInput: ".popup__input",
  popupInputTypeEror: "popup__input_type_error",
  popupInputError: "poup__input-error",
  popupForm: ".popup__form",
  popupInactiveBtn: "popup__btn-inactive",
  buttonSave: ".popup__btn-save",
  delPopup:".popup_use_del",
};

// *popup and form
const formElement = document.querySelector(selectors.form);
const nameInput = formElement.querySelector(selectors.inputName);
const aboutInput = formElement.querySelector(selectors.inputDesc);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupCard = document.querySelector(selectors.popupCard);
const popupWithImg = document.querySelector(selectors.popupImg);
const avatarUpdatePopup = document.querySelector(selectors.popupAvatar);
const avatarIcon = document.querySelector('.profile__avatar');
const forms = Array.from(document.forms);
const delPopup = document.querySelector(popupSelecors.delPopup)

// *PROFILE
const profile = document.querySelector(selectors.profile);
const profileEditBtn = profile.querySelector(selectors.editBtn);
const addCardBtn = profile.querySelector(selectors.addBnt);
const name = profile.querySelector(selectors.name);
const about = profile.querySelector(selectors.work);
const avatarEditButton = profile.querySelector(selectors.avatarEditButton)
const avatarInput = avatarUpdatePopup.querySelector(selectors.avatarInput)
const headers = {
  token:'c5441015-f46a-42d4-9fdb-e128e5e29cd3',
}
const url = 'https://mesto.nomoreparties.co/v1/cohort-50'

// *CARD
const template = document.querySelector(selectors.template).content;
const placeContainer = document.querySelector(selectors.placeContainer);
const cardDelButton = template.querySelector(cardSelectors.removeButton);


// loading 

export {
  avatarInput,
  popupWithImg,
  formElement,
  nameInput,
  aboutInput,
  popupProfile,
  popupCard,
  forms,
  profile,
  profileEditBtn,
  addCardBtn,
  name,
  about,
  template,
  placeContainer,
  url,
  headers,
  delPopup,
  cardDelButton,
  avatarUpdatePopup,
  avatarIcon,
  avatarEditButton
};

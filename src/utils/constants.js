export const validationClass = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_error',
   errorClass: 'popup__error_active',
};

const popupEditProfile = document.querySelector('.popup_type_edit');
export const formEditProfile = popupEditProfile.querySelector('[name="editForm"]');
export const profileName = formEditProfile.querySelector('[name="name"]');
export const profileJob = formEditProfile.querySelector('[name="about"]');
const popupAddCard = document.querySelector('.popup_type_add-card');;
export const formAddNewCard = popupAddCard.querySelector('[name="addForm"]');

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const buttonAvatar = document.querySelector('.profile__avatar-edit-button');
export const formEditAvatar = popupEditAvatar.querySelector('[name="edit-avatar-form"]');
export const profileAvatar = document.querySelector('.profile__avatar');
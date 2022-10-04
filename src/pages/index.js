import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
   initialCards, buttonEdit, formEditProfile,
   profileName, profileJob, buttonAdd,
   formAddNewCard, validationClass,
} from '../utils/constants.js';

function createCard(data) {
   const card = new Card({
      data: data, handleCardClick: (name, link) => {
         popupImage.open({ name, link });
      }
   }, '.element-template');
   const newCard = card.generateCard();
   return newCard;
}

const cardList = new Section({
   items: initialCards, renderer: (item) => {
      cardList.addItem(createCard(item));
   },
}, '.elements__cards');

cardList.renderItems(initialCards);

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

function infoPopupFormProfile({ name, about }) {
   profileName.value = name;
   profileJob.value = about;
}

const userInfo = new UserInfo({
   name: '.profile__name',
   about: '.profile__subtitle'
});

const profilePopupEdit = new PopupWithForm({
   popupSelector: '.popup_type_edit', handleSubmit: (data) => {
      userInfo.setUserInfo({
         name: data.name,
         about: data.about
      });
      profilePopupEdit.close();
   }
});

profilePopupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
   const info = userInfo.getUserInfo();
   infoPopupFormProfile({
      name: info.name,
      about: info.about
   });
   formEditProfileValidator.resetValidation();
   profilePopupEdit.open();
});

const popupFormAddCard = new PopupWithForm({
   popupSelector: '.popup_type_add-card', handleSubmit: (data) => {
      cardList.addItem(createCard(data))
      popupFormAddCard.close();
   }
})

popupFormAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
   formAddNewCardValidator.resetValidation();
   popupFormAddCard.open();
});

const formEditProfileValidator = new FormValidator(validationClass, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(validationClass, formAddNewCard);
formAddNewCardValidator.enableValidation();
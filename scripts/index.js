import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationClass } from './cards.js';

const elementTemplate = document.querySelector('.element-template').content;
const elementCards = document.querySelector('.elements__cards');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupFormProfile = popupEditProfile.querySelector('.popup__form');
const popupNameProfile = popupEditProfile.querySelector('.popup__input_type_name');
const popupJobProfile = popupEditProfile.querySelector('.popup__input_type_job');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFormCard = popupAddCard.querySelector('.popup__form');
const popupNameCard = popupAddCard.querySelector('.popup__input_add-card_name');
const popupLinkCard = popupAddCard.querySelector('.popup__input_add-card_link');

const popupImage = document.querySelector('.popup_type_image');
const popupZoomImage = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const popupCloseOverlay = document.querySelectorAll('.popup');

function createCard(item) {
   const card = new Card(item, elementTemplate, openPopupZoom);
   return card.generateCard();
};


function addPopupCard(evt) {
   evt.preventDefault();
   const newImage = {
      name: popupNameCard.value,
      link: popupLinkCard.value
   }

   elementCards.prepend(createCard(newImage));
   popupFormCard.reset();
   closePopup(popupAddCard);
}



popupFormCard.addEventListener('submit', addPopupCard);

function openPopupZoom(name, link) {
   //popupZoomImage.src = zoom.querySelector('.element__image').src;
   //popupZoomImage.alt = zoom.querySelector('.element__image').alt;
   //popupCaption.textContent = zoom.querySelector('.element__title').textContent;
   popupZoomImage.src = link;
   popupZoomImage.alt = name;
   popupCaption.textContent = name;
   openPopup(popupImage);
}

initialCards.forEach(card => {
   elementCards.append(createCard(card));
});

function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
   popup.classList.remove('popup_opened')
   document.removeEventListener('keydown', closePopupEsc)
}

function closePopupEsc(evt) {
   if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
   }
}

popupCloseOverlay.forEach((element) => {
   element.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
         closePopup(element);
      }
      if (evt.target.classList.contains('popup__close')) {
         closePopup(element);
      }
   });
})

function openPopupProfile() {
   popupNameProfile.value = profileName.textContent;
   popupJobProfile.value = profileJob.textContent;
   popupEditProfileFormValidator.resetValidation();
   openPopup(popupEditProfile);
}

function openPopupCard() {
   openPopup(popupAddCard);
   popupAddCardFormValidator.resetValidation();
}

buttonEdit.addEventListener('click', () => openPopupProfile());
buttonAdd.addEventListener('click', () => openPopupCard());


function handlerProfileFormSubmit(evt) {
   evt.preventDefault();

   profileName.textContent = popupNameProfile.value;
   profileJob.textContent = popupJobProfile.value;

   closePopup(popupEditProfile);
}

popupFormProfile.addEventListener('submit', handlerProfileFormSubmit);

const popupEditProfileFormValidator = new FormValidator(validationClass, popupEditProfile);
popupEditProfileFormValidator.enableValidation();

const popupAddCardFormValidator = new FormValidator(validationClass, popupAddCard);
popupAddCardFormValidator.enableValidation();

//export { openPopupZoom };
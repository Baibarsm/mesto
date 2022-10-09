import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from "../components/Api.js"
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import {
   buttonEdit, formEditProfile,
   profileName, profileJob, buttonAdd,
   formAddNewCard, validationClass,
   buttonAvatar, formEditAvatar, profileAvatar
} from '../utils/constants.js';

const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
   headers: {
      authorization: '1099b6dd-f39a-4f69-8361-f6b8684a66b6',
      'Content-Type': 'application/json'
   }
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([userData, initialCards]) => {
      userInfo.setUserInfo(userData);
      userId = userData._id
      cardList.renderItems(initialCards);
   })
   .catch((err) => console.log(err))

const createCard = (data) => {
   const card = new Card({
      data: data,
      userId: userId,
      handleCardClick: () => {
         popupImage.open(data);
      },
      handleDeleteCard: (cardId) => {
         deletePopup.open();
         deletePopup.submitDelCard(() => {
            api.deleteCard(cardId).then(() => {
               card.deleteCard();
               deletePopup.close();
            })
               .catch((err) => console.log(err));
         });
      },
      handleCardLike: (cardId) => {
         api.addCardLike(cardId).then((data) => {
            card.likeCard(data);
         })
            .catch((err) => console.log(err));
      },
      handleDeleteLike: (cardId) => {
         api.deleteCardLike(cardId).then((data) => {
            card.likeCard(data);
         })
            .catch((err) => console.log(err));
      }
   }, '.element-template');

   return card.generateCard();
};

const cardList = new Section({
   renderer: (card) => {
      cardList.addItemAppend(createCard(card));
   },
}, '.elements__cards');

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

function setInfoPopupFormProfile({ name, about }) {
   profileName.value = name;
   profileJob.value = about;
}

const userInfo = new UserInfo({
   name: '.profile__name',
   about: '.profile__subtitle',
   profileAvatar: '.profile__avatar'
});

const profilePopupEdit = new PopupWithForm({
   popupSelector: '.popup_type_edit', handleSubmit: (data) => {
      profilePopupEdit.loading(true);
      api.updateUserInfo(data)
         .then((data) => {
            console.log(data);
            userInfo.setUserInfo(data);
            profilePopupEdit.close();
         })
         .catch((err) => console.log(err)).finally(() => {
            profilePopupEdit.loading(false);
         })
   }
});

profilePopupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
   const info = userInfo.getUserInfo();
   setInfoPopupFormProfile({
      name: info.name,
      about: info.about
   });
   formEditProfileValidator.resetValidation();
   profilePopupEdit.open();
});

const popupFormAddCard = new PopupWithForm({
   popupSelector: '.popup_type_add-card', handleSubmit: (data) => {
      popupFormAddCard.loading(true);
      api.addNewCard(data).then((data) => {
         cardList.addItem(createCard(data))
         popupFormAddCard.close();
      })
         .catch((err) => console.log(err)).finally(() => {
            popupFormAddCard.loading(false);
         })
   }
})

popupFormAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
   formAddNewCardValidator.resetValidation();
   popupFormAddCard.open();
});

const deletePopup = new PopupWithConfirm('.popup_type_delete-confirm');
deletePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm({
   popupSelector: '.popup_type_edit-avatar',
   handleSubmit: (data) => {
      editAvatarPopup.loading(true);
      api.updateAvatar(data)
         .then((data) => {
            profileAvatar.src = data.avatar;
            editAvatarPopup.close();
         })
         .catch((err) => console.log(err)).finally(() => {
            editAvatarPopup.loading(false);
         });
   }
})
editAvatarPopup.setEventListeners();

buttonAvatar.addEventListener('click', () => {
   editAvatarPopup.open();
   formEditAvatarValidator.resetValidation();
})

const formEditProfileValidator = new FormValidator(validationClass, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(validationClass, formAddNewCard);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(validationClass, formEditAvatar);
formEditAvatarValidator.enableValidation();
const elementTemplate = document.querySelector('.element-template').content;
const elementCards = document.querySelector('.elements__cards');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCloseProfile = popupEditProfile.querySelector('.popup__close');
const popupFormProfile = popupEditProfile.querySelector('.popup__form');
const popupNameProfile = popupEditProfile.querySelector('.popup__input_type_name');
const popupJobProfile = popupEditProfile.querySelector('.popup__input_type_job');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupCloseCard = popupAddCard.querySelector('.popup__close');
const popupFormCard = popupAddCard.querySelector('.popup__form');
const popupNameCard = popupAddCard.querySelector('.popup__input_add-card_name');
const popupLinkCard = popupAddCard.querySelector('.popup__input_add-card_link');

const popupImage = document.querySelector('.popup_type_image');
const popupCloseImage = popupImage.querySelector('.popup__close');
const popupZoomImage = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');


function createCard(card) {
   const cardElement = elementTemplate.cloneNode(true);
   const cardImage = cardElement.querySelector('.element__image');
   const cardLike = cardElement.querySelector('.element__like-button');
   const cardDelete = cardElement.querySelector('.element__trash-button');

   cardImage.src = card.link;
   cardImage.alt = card.name;
   cardElement.querySelector('.element__title').textContent = card.name;

   cardLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-button_active');
   });

   cardDelete.addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
   });

   cardImage.addEventListener('click', () => openPopupZoom(cardImage));

   return cardElement;
}

function openPopupZoom(zoom) {
   popupZoomImage.src = zoom.src;
   popupZoomImage.alt = zoom.alt;
   popupCaption.textContent = zoom.alt;
   openPopup(popupImage);
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


initialCards.forEach(function (item) {
   const newCard = createCard(item);
   elementCards.append(newCard);
});

function openPopup(popup) {
   popup.classList.add('popup_opened')
}

function closePopup(popup) {
   popup.classList.remove('popup_opened')
}

function openPopupProfile() {
   popupNameProfile.value = profileName.textContent;
   popupJobProfile.value = profileJob.textContent;
   openPopup(popupEditProfile);
}

editButton.addEventListener('click', () => openPopupProfile());
addButton.addEventListener('click', () => openPopup(popupAddCard));

popupCloseProfile.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseCard.addEventListener('click', () => closePopup(popupAddCard));
popupCloseImage.addEventListener('click', () => closePopup(popupImage));

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handlerProfileFormSubmit(evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Так мы можем определить свою логику отправки.
   // О том, как это делать, расскажем позже.

   // Вставьте новые значения с помощью textContent
   profileName.textContent = popupNameProfile.value;
   profileJob.textContent = popupJobProfile.value;

   closePopup(popupEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupFormProfile.addEventListener('submit', handlerProfileFormSubmit);
//import { openPopupZoom } from './index.js';

class Card {
   constructor(card, cardTemplate, openPopupZoom) {
      this._name = card.name;
      this._link = card.link;
      this._cardTemplate = cardTemplate;
      this._openPopupZoom = openPopupZoom;
   };

   _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
         this._likeCard(evt);
      });

      this._element.querySelector('.element__trash-button').addEventListener('click', () => {
         this._deleteCard();
      });

      this._elementImage.addEventListener('click', () => {
         this._openPopupZoom(this._name, this._link);
      });
   };

   _getTemplate() {
      return this._cardTemplate.querySelector('.element').cloneNode(true);
   };

   _likeCard(evt) {
      evt.target.classList.toggle('element__like-button_active');
   };

   _deleteCard() {
      this._element.remove();
   };

   generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__title').textContent = this._name;
      this._elementImage.alt = this._name;
      this._elementImage.src = this._link;

      this._setEventListeners();
      return this._element;
   }

};

export { Card };
import { openPopupZoom } from './index.js';

class Card {
   constructor(card, cardTemplate) {
      this._name = card.name;
      this._link = card.link;
      this._cardTemplate = cardTemplate;
   }

   _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
         this._likeCard(evt);
      });

      this._element.querySelector('.element__trash-button').addEventListener('click', (evt) => {
         this._deleteCard(evt);
      });

      this._elementImage.addEventListener('click', () => {
         openPopupZoom(this._element);
      });
   }

   _getTemplate() {
      return this._cardTemplate.querySelector('.element').cloneNode(true);
   }

   _likeCard(evt) {
      evt.target.classList.toggle('element__like-button_active');
   }

   _deleteCard(evt) {
      evt.target.closest('.element').remove();
   }

   generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._elementImage.alt = this._name;
      this._elementImage.src = this._link;
      this._element.querySelector('.element__title').textContent = this._name;
      this._setEventListeners();
      return this._element;
   }

};

export { Card };
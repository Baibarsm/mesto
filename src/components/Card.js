class Card {

   constructor({ data, handleCardClick }, cardTemplate) {
      this._name = data.name;
      this._link = data.link;
      this._cardTemplate = cardTemplate;
      this._handleCardClick = handleCardClick;
   };

   _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
         this._likeCard(evt);
      });

      this._element.querySelector('.element__trash-button').addEventListener('click', () => {
         this._deleteCard();
      });

      this._elementImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   };

   _getTemplate() {
      const cardElement = document.querySelector(this._cardTemplate)
         .content.querySelector('.element').cloneNode(true);
      return cardElement;
   };

   _likeCard(evt) {
      evt.target.classList.toggle('element__like-button_active');
   };

   _deleteCard() {
      this._element.remove();
      this._element = null;
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
}


export { Card };
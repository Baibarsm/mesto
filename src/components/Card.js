class Card {

   constructor({ data, handleCardClick, userId, handleDeleteCard, handleCardLike, handleDeleteLike }, cardTemplate) {
      this._name = data.name;
      this._link = data.link;
      this._cardTemplate = cardTemplate;
      this._handleCardClick = handleCardClick;
      this._cardId = data._id;
      this._userId = userId;
      this._cardOwnerId = data.owner._id;
      this._likes = data.likes;
      this._handleDeleteCard = handleDeleteCard;
      this._handleCardLike = handleCardLike;
      this._handleDeleteLike = handleDeleteLike;
   };

   _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
         if (this._likeButton.classList.contains('element__like-button_active')) {
            this._handleDeleteLike(this._cardId);
         } else {
            this._handleCardLike(this._cardId);
         }
      });

      this._delete.addEventListener('click', () => {
         this._handleDeleteCard(this._cardId);
      });

      this._elementImage.addEventListener('click', () => {
         this._handleCardClick();
      });
   };

   _getTemplate() {
      const cardElement = document.querySelector(this._cardTemplate)
         .content.querySelector('.element').cloneNode(true);
      return cardElement;
   };

   likeCard(data) {
      this._likes = data.likes;
      this._likeButton.classList.toggle('element__like-button_active');
      this._likeCounter.textContent = this._likes.length;
   };

   _isLiked() {
      if (this._likes.some((item) => {
         return this._userId === item._id;
      })) {
         this._likeButton.classList.add('element__like-button_active');
      }
   };

   _checkDeleteButton() {
      if (this._cardOwnerId !== this._userId) {
         this._delete.remove();
      }
   };

   deleteCard() {
      this._element.remove();
      this._element = null;
   };

   generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__title').textContent = this._name;
      this._elementImage.alt = this._name;
      this._elementImage.src = this._link;
      this._likeButton = this._element.querySelector('.element__like-button');
      this._delete = this._element.querySelector('.element__trash-button');
      this._likeCounter = this._element.querySelector('.element__likes-counter')
      this._likeCounter.textContent = this._likes.length;
      this._checkDeleteButton();
      this._isLiked();
      this._setEventListeners();
      return this._element;
   };
};

export { Card };
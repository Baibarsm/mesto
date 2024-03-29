import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
   constructor({ popupSelector, handleSubmit }) {
      super(popupSelector);
      this._handleSubmit = handleSubmit;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
      this._button = this._popupForm.querySelector('.popup__submit');
   }

   _getInputValues = () => {
      this._formValues = {};
      this._inputList.forEach(input => {
         this._formValues[input.name] = input.value;
      })
      return this._formValues;
   }

   setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handleSubmit(this._getInputValues())
      })
   }

   close() {
      super.close()
      this._popupForm.reset()
   }

   loading(status) {
      if (status) {
         this._button.textContent = 'Сохранение...';
      } else {
         this._button.textContent = 'Сохранить';
      }
   }
}
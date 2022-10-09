import { Popup } from './Popup.js'

export class PopupWithConfirm extends Popup {
   constructor(popupSelector) {
      super(popupSelector)
      this._form = this._popup.querySelector('.popup__form')
   }

   submitDelCard(action) {
      this._handleDelSubmit = action;
   }

   setEventListeners() {
      super.setEventListeners()
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault()
         this._handleDelSubmit()
      })
   }
}
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._popupZoomImage = this._popup.querySelector('.popup__image');
      this._popupCaption = this._popup.querySelector('.popup__caption');
   }

   open = (data) => {
      this._popupZoomImage.src = data.link;
      this._popupZoomImage.alt = data.name;
      this._popupCaption.textContent = data.name;
      super.open();
   }
}
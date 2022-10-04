class FormValidator {

   constructor(setting, formElement) {
      this._formSelector = setting.formSelector;
      this._inputSelector = setting.inputSelector;
      this._submitButtonSelector = setting.submitButtonSelector;
      this._inactiveButtonClass = setting.inactiveButtonClass;
      this._inputErrorClass = setting.inputErrorClass;
      this._errorClass = setting.errorClass;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
   };

   _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
   };

   _hideInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
   };

   _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
         this._showInputError(inputElement, inputElement.validationMessage);
      } else {
         this._hideInputError(inputElement);
      }
   };

   _setEventListeners = () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
         });
      });
   };

   _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
   };

   _toggleButtonState() {
      if (this._hasInvalidInput()) {
         this._disableButtonState();
      } else {
         this._buttonElement.classList.remove(this._inactiveButtonClass);
         this._buttonElement.removeAttribute("disabled");
      }
   };

   _disableButtonState = () => {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
   };

   resetValidation() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
         this._hideInputError(inputElement)
      });
   }

   enableValidation() {
      this._setEventListeners();
   }
}

export { FormValidator }
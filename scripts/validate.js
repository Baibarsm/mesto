const validationClass = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit',
   inactiveButtonClass: 'popup__submit_disabled',
   inputErrorClass: 'popup__input_error',
   errorClass: 'popup__error_active',
};

const showInputError = (formElement, inputElement, errorMessage) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.add(validationClass.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(validationClass.errorClass);
};

const hideInputError = (formElement, inputElement) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.remove(validationClass.inputErrorClass);
   errorElement.classList.remove(validationClass.errorClass);
   errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
   if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
   } else {
      hideInputError(formElement, inputElement);
   }
};

const setEventListeners = (formElement) => {
   const inputList = Array.from(formElement.querySelectorAll(validationClass.inputSelector));
   const buttonElement = formElement.querySelector(validationClass.submitButtonSelector);
   toggleButtonState(inputList, buttonElement);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement);
         toggleButtonState(inputList, buttonElement);
      });
   });
};

const enableValidation = ({ validationClass }) => {
   const formList = Array.from(document.forms);
   formList.forEach((formElement) => {
      setEventListeners(formElement, validationClass);
   });
};


enableValidation(validationClass);


function hasInvalidInput(inputList) {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
}

function toggleButtonState(inputList, buttonElement) {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationClass.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
   } else {
      buttonElement.classList.remove(validationClass.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
}
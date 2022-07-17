const popupElement = document.querySelector('.popup')
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

const openPopup = function () {
   popupElement.classList.add('popup_opened');
}

const closePopup = function () {
   popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileJob = profileElement.querySelector('.profile__subtitle');



// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name') // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_type_job') // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
   // Так мы можем определить свою логику отправки.
   // О том, как это делать, расскажем позже.

   // Получите значение полей jobInput и nameInput из свойства value
   let name = nameInput.value;
   let job = jobInput.value;

   // Вставьте новые значения с помощью textContent
   profileName.textContent = name;
   profileJob.textContent = job;

   closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
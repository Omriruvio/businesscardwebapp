const cardEditButtonEl = document.querySelector('.card__edit-button');
const modalEl = document.querySelector('.card-edit-modal');
const modalCloseButtonEl = document.querySelector('.card-edit-modal__close-button');

// select card person name element
const cardPersonNameEL = document.querySelector('.card__person-name');
// select card person profession element
const cardPersonProfessionEL = document.querySelector('.card__person-profession');
// select card person image element
const cardPersonAvatarEL = document.querySelector('.card__person-avatar');
// select card person contact info element
const cardPersonContactEL = document.querySelector('.card__person-contact-info');

// select name input field
const nameInput = document.querySelector('.js-name-input');
// select profesison input field
const professionInput = document.querySelector('.js-profession-input');
// select avatar url input field
const avatarUrlInput = document.querySelector('.js-img-url-input');
// select contact info input field
const contactInput = document.querySelector('.js-contact-input');

// select submit button element
// const submitButtonEl = document.querySelector('.card-edit-form__submit-button')

// select form element 
const formEl = document.querySelector('.card-edit-form')


cardEditButtonEl.addEventListener('click', () => {
  modalEl.classList.add('card-edit-modal_active')
  nameInput.value = cardPersonNameEL.textContent;
  professionInput.value = cardPersonProfessionEL.textContent;
  contactInput.value = cardPersonContactEL.textContent;
  // add image url fetching
})

modalCloseButtonEl.addEventListener('click', () => {
  modalEl.classList.remove('card-edit-modal_active')
})

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  cardPersonNameEL.textContent = nameInput.value;
  cardPersonProfessionEL.textContent = professionInput.value;
  cardPersonContactEL.textContent = contactInput.value;
  // add image changing functionality
})






// add click outside modal to close functinoality 
// modalEl.addEventListener('click', () => {
//   modalEl.classList.remove('card-edit-modal_active')
// })
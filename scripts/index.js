let cards = [];
let isCardNew = false;

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

let toggleModal = () => {
  modalEl.classList.toggle('card-edit-modal_active');
}

let newCard = () => {
  let card = {
    name: nameInput.value,
    profession: professionInput.value,
    contact: contactInput.value,
    image: avatarUrlInput.value,
  }
  return card;
}


cardEditButtonEl.addEventListener('click', () => {
  // add selector based on card array position
  toggleModal();
  nameInput.value = cardPersonNameEL.textContent;
  professionInput.value = cardPersonProfessionEL.textContent;
  contactInput.value = cardPersonContactEL.textContent;
  // add image url fetching
})

modalCloseButtonEl.addEventListener('click', () => {
  toggleModal();
})

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  cardPersonNameEL.textContent = nameInput.value;
  cardPersonProfessionEL.textContent = professionInput.value;
  cardPersonContactEL.textContent = contactInput.value;
  toggleModal();
  // add image changing functionality
})

// add click outside modal to close functinoality 
// modalEl.addEventListener('click', () => {
//   modalEl.classList.remove('card-edit-modal_active')
// })

// listen to + button and execute:
//    open modal
//    set variable isCardNew = true

//    listen to save button button and execute:
//        if isCardNew
//            let newCard = {add properties to card object}
//            cards.append?(newCard)
//            add elements with classes and object content to html
//    


// create a customCard object 
// array of objects? this way can control card number and assign unique identifiers/classes

// function that creates a new customCard based on user input

// function that adds the elements based on the new customCard

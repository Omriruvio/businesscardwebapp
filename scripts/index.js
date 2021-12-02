let cards = [];
let isCardNew = false;

const cardEditButtonEl = document.querySelector('.card__edit-button');
const modalEl = document.querySelector('.card-edit-modal');
const modalCloseButtonEl = document.querySelector('.card-edit-modal__close-button');
const cardAddButtonEl = document.querySelector('.card__add-button');

// select card person name element
const cardPersonNameEL = document.querySelector('.card__person-name');
// select card person profession element
const cardPersonProfessionEL = document.querySelector('.card__person-profession');
// select card person image element
const cardPersonAvatarEL = document.querySelector('.card__person-avatar');
// select card person contact info element
const cardPersonContactEL = document.querySelector('.card__person-contact-info');
// select first card element (prototype)
const cardPrototypeEl = document.querySelector('.card');
// select the full card list
const cardListEl = document.querySelector('.card-list');

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
    serial: cards.length + 1,
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

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  
  updateCard();

  // add image changing functionality
})

// add click outside modal to close functinoality 
// modalEl.addEventListener('click', () => {
//   modalEl.classList.remove('card-edit-modal_active')
// })

let updateCard = () => {
  // if card is new create new card and add to array
  if (isCardNew) {
    let currentCard = newCard();  
    cards.push(currentCard)
    let newCardElement = cardPrototypeEl.cloneNode(true);
    newCardElement.classList.add('card'+'-id-'+currentCard.serial)
    // select each editable field and update according to currentCard object
    newCardElement.querySelector('.card__person-name').textContent = currentCard.name;
    newCardElement.querySelector('.card__person-profession').textContent = currentCard.profession;
    newCardElement.querySelector('.card__person-avatar').textContent = currentCard.image;
    newCardElement.querySelector('.card__person-contact-info').textContent = currentCard.contact;
    newCardElement.serial = currentCard.serial;
    cardListEl.appendChild(newCardElement) 
  } else {
    // else apply change to edited card
    cardPersonNameEL.textContent = nameInput.value;
    cardPersonProfessionEL.textContent = professionInput.value;
    cardPersonContactEL.textContent = contactInput.value;
    isCardNew = false;
    
  }
  toggleModal();
}


modalCloseButtonEl.addEventListener('click', () => {
  toggleModal();
})

cardAddButtonEl.addEventListener('click', () => {
  toggleModal();
  isCardNew = true;
})
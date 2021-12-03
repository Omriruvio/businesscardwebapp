let cards = [];
let isCardNew = false;
let currentCardNumber;
let currentCardElement;
let randomAvatarLength = 12;

const cardEditButtonEl = document.querySelector('.card__edit-button');
const modalEl = document.querySelector('.card-edit-modal');
const modalCloseButtonEl = document.querySelector('.card-edit-modal__close-button');
const cardAddButtonEl = document.querySelector('.card__add-button');

const cardPersonNameEL = document.querySelector('.card__person-name');
const cardPersonProfessionEL = document.querySelector('.card__person-profession');
const cardPersonAvatarEL = document.querySelector('.card__person-avatar');
const cardPersonContactEL = document.querySelector('.card__person-contact-info');
const cardPrototypeEl = document.querySelector('.card')
const cardListEl = document.querySelector('.card-list');
const nameInput = document.querySelector('.js-name-input');
const professionInput = document.querySelector('.js-profession-input');
const avatarUrlInput = document.querySelector('.js-img-url-input');
const contactInput = document.querySelector('.js-contact-input');
const formEl = document.querySelector('.card-edit-form')

let firstCard = {
  name: cardPersonNameEL.textContent,
  profession: cardPersonProfessionEL.textContent,
  contact: cardPersonContactEL.textContent,
  image: cardPersonAvatarEL.currentSrc,
  serial: 0
}
cards.push(firstCard);

let getRandomAvatarUrl = () => {
  let randomIndex = Math.floor(Math.random()*randomAvatarLength) +1;
  let randomAvatarUrl = './images/random-avatar-' + randomIndex + '.svg';
  return randomAvatarUrl;
}

let newCard = () => {
  let card = {
    name: nameInput.value,
    profession: professionInput.value,
    contact: contactInput.value,
    image: avatarUrlInput.value,
    serial: cards.length,
  }
  return card;
}

let getCurrentCardElement = (event) => {
  let target = event.target.parentNode.className; 
  target = target[target.length-1];
  currentCardNumber = target;
  currentCardElement = document.querySelector('.card-id-' + currentCardNumber);
}


cardEditButtonEl.addEventListener('click', (event) => {
  // add selector based on card array position
  toggleModal();
  getCurrentCardElement(event);
  nameInput.value = cards[currentCardNumber].name;
  professionInput.value = cards[currentCardNumber].profession;
  contactInput.value = cards[currentCardNumber].contact;
  avatarUrlInput.value = cards[currentCardNumber].image;
})

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  updateCard();
})

// add click outside modal to close functinoality 

let updateCard = () => {
  // if card is new create new card and add to array
  if (isCardNew) {
    let currentCard = newCard();  
    cards.push(currentCard)
    let newCardElement = cardPrototypeEl.cloneNode(true);
    newCardElement.classList.remove('card-id-0');
    newCardElement.classList.add('card'+'-id-'+ currentCard.serial);
    newCardElement.querySelector('.card__person-name').textContent = currentCard.name;
    newCardElement.querySelector('.card__person-profession').textContent = currentCard.profession;
    newCardElement.querySelector('.card__person-avatar').src = currentCard.image;
    newCardElement.querySelector('.card__person-contact-info').textContent = currentCard.contact;
    newCardElement.querySelector('.card__edit-button').addEventListener('click', (event) => {
      toggleModal();
      getCurrentCardElement(event);
      nameInput.value = cards[currentCardNumber].name;
      professionInput.value = cards[currentCardNumber].profession;
      contactInput.value = cards[currentCardNumber].contact;
      avatarUrlInput.value = cards[currentCardNumber].image;
    })
    newCardElement.serial = currentCard.serial;
    cardListEl.appendChild(newCardElement);
    isCardNew = false;
  } else {
    let currentCard = document.querySelector('.card-id-' + currentCardNumber);
    currentCard.querySelector('.card__person-name').textContent = nameInput.value;
    currentCard.querySelector('.card__person-profession').textContent = professionInput.value;
    currentCard.querySelector('.card__person-avatar').src = avatarUrlInput.value;
    currentCard.querySelector('.card__person-contact-info').textContent = contactInput.value;
    currentCard.name = nameInput.value;
    currentCard.profession = professionInput.value;
    currentCard.image = avatarUrlInput.value;
    currentCard.contact  = contactInput.value;
  }
  toggleModal();
}


modalCloseButtonEl.addEventListener('click', () => {
  toggleModal();
})

cardAddButtonEl.addEventListener('click', () => {
  toggleModal();
  isCardNew = true;
  nameInput.value = 'Your name';
  professionInput.value = 'Your profession / education';
  contactInput.value = 'Your contact information';
  avatarUrlInput.value = getRandomAvatarUrl();
})

let toggleModal = () => {
  modalEl.classList.toggle('card-edit-modal_active');
}

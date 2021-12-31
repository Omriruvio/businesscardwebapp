let cards = [];
let isCardNew = false;
let currentCardNumber;
let currentCardElement = document.querySelector('.card');
let randomAvatarLength = 12;

const cardEditButtonEl = document.querySelector('.card__edit-button');
const modalEl = document.querySelector('.card-edit-modal');
const modalCloseButtonEl = document.querySelector('.card-edit-modal__close-button');
const cardAddButtonEl = document.querySelector('.card__add-button');
const cardDeleteButtonEl = document.querySelector('.card__delete-button');

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
const colorInput = document.querySelector('.js-color-input');
const formEl = document.querySelector('.card-edit-form');
const pageElement = document.querySelector('.page');

cardPrototypeEl.id = 0;

let firstCard = {
  name: cardPersonNameEL.textContent,
  profession: cardPersonProfessionEL.textContent,
  contact: cardPersonContactEL.textContent,
  image: cardPersonAvatarEL.currentSrc,
  color: "#FAEBD7",
  serial: 0
}
cards.push(firstCard);

let getRandomAvatarUrl = () => {
  let randomIndex = Math.floor(Math.random()*randomAvatarLength) +1;
  let randomAvatarUrl = './images/random-avatar-' + randomIndex + '.svg';
  return randomAvatarUrl;
}

let createNewCard = () => {
  let card = {
    name: nameInput.value,
    profession: professionInput.value,
    contact: contactInput.value,
    image: avatarUrlInput.value,
    serial: cards.length,
    color: colorInput.value
  }
  return card;
}

let getCurrentCardElement = (event) => {
  currentCardNumber = event.target.parentNode.id; 
  currentCardElement = document.querySelector('.card-id-' + currentCardNumber);
}

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const handleEditButtonClick = (event) => {
  toggleModal();
  getCurrentCardElement(event);
  const currentCardID = event.target.closest('.card').id;
  nameInput.value = cards[currentCardID].name;
  professionInput.value = cards[currentCardID].profession;
  contactInput.value = cards[currentCardID].contact;
  avatarUrlInput.value = cards[currentCardID].image;
  colorInput.value = cards[currentCardID].color;
}


cardEditButtonEl.addEventListener('click', (event) => handleEditButtonClick(event));

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  updateCard(currentCardElement);
})

cardDeleteButtonEl.addEventListener('click', (event) => {
  getCurrentCardElement(event);
  console.log(currentCardElement);
  currentCardElement.remove();
})

const createNewCardFromInput = () => {
      // calls a function that pulls the data from the user input and saves card obj in currentCard
      let currentCard = createNewCard();  
      // saves card info in cards array (for reasons yet to be decided)
      cards.push(currentCard)
      let newCardElement = cardPrototypeEl.cloneNode(true);
      newCardElement.classList.remove('card-id-0');
      newCardElement.classList.add('card'+'-id-'+ currentCard.serial);
      newCardElement.querySelector('.card__person-name').textContent = currentCard.name;
      newCardElement.querySelector('.card__person-profession').textContent = currentCard.profession;
      newCardElement.querySelector('.card__person-avatar').src = currentCard.image;
      newCardElement.querySelector('.card__person-contact-info').textContent = currentCard.contact;
      newCardElement.style.backgroundColor = currentCard.color;
      newCardElement.id = currentCard.serial;
      newCardElement.querySelector('.card__edit-button').addEventListener('click', (event) => handleEditButtonClick(event));
      newCardElement.querySelector('.card__delete-button').addEventListener('click', (event) => {
        getCurrentCardElement(event);
        console.log(currentCardElement);
        currentCardElement.remove();
        // add remove card from cards array
      })
      newCardElement.serial = currentCard.serial;
      return newCardElement;
}

// add click outside modal to close functinoality 

let updateCard = (card) => {
  // if card is new create new card and add to array
  if (isCardNew) {
    cardListEl.appendChild(createNewCardFromInput());
    isCardNew = false;
  } else { // if card is not new
    card.querySelector('.card__person-name').textContent = nameInput.value;
    card.querySelector('.card__person-profession').textContent = professionInput.value;
    card.querySelector('.card__person-avatar').src = avatarUrlInput.value;
    card.querySelector('.card__person-contact-info').textContent = contactInput.value;
    card.style.backgroundColor = colorInput.value;
    cards[card.id].name = nameInput.value;
    cards[card.id].profession = professionInput.value;
    cards[card.id].contact = contactInput.value;
    cards[card.id].image = avatarUrlInput.value;
    cards[card.id].color = colorInput.value;
  }
  toggleModal();
}

modalCloseButtonEl.addEventListener('click', () => {
  toggleModal();
  isCardNew = false;
})

cardAddButtonEl.addEventListener('click', () => {
  toggleModal();
  isCardNew = true;
  nameInput.value = 'Your name';
  professionInput.value = 'Your profession / education';
  contactInput.value = 'Your contact information';
  avatarUrlInput.value = getRandomAvatarUrl();
  colorInput.value = getRandomColor();
})

let toggleModal = () => {
  modalEl.classList.toggle('card-edit-modal_active');
  nameInput.focus();
}

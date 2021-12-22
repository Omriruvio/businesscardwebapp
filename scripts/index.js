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

let newCard = () => {
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
  let target = event.target.parentNode.id; 
  currentCardNumber = target;
  currentCardElement = document.querySelector('.card-id-' + currentCardNumber);
  console.log('current card id is: ' + currentCardNumber);
}

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


cardEditButtonEl.addEventListener('click', (event) => {
  // add selector based on card array position
  toggleModal();
  getCurrentCardElement(event);
  nameInput.value = cards[currentCardNumber].name;
  professionInput.value = cards[currentCardNumber].profession;
  contactInput.value = cards[currentCardNumber].contact;
  avatarUrlInput.value = cards[currentCardNumber].image;
  colorInput.value = cards[currentCardNumber].color;
})

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  updateCard();
})

cardDeleteButtonEl.addEventListener('click', (event) => {
  getCurrentCardElement(event);
  console.log(currentCardElement);
  currentCardElement.remove();
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
    newCardElement.style.backgroundColor = currentCard.color;
    newCardElement.id = currentCard.serial;
    newCardElement.querySelector('.card__edit-button').addEventListener('click', (event) => {
      toggleModal();
      getCurrentCardElement(event);
      nameInput.value = cards[currentCardNumber].name;
      professionInput.value = cards[currentCardNumber].profession;
      contactInput.value = cards[currentCardNumber].contact;
      avatarUrlInput.value = cards[currentCardNumber].image;
      colorInput.value = cards[currentCardNumber].color;
    })
    newCardElement.querySelector('.card__delete-button').addEventListener('click', (event) => {
      getCurrentCardElement(event);
      console.log(currentCardElement);
      currentCardElement.remove();
      // add remove card from cards array
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
    currentCard.style.backgroundColor = colorInput.value;
    cards[currentCardNumber].name = nameInput.value;
    cards[currentCardNumber].profession = professionInput.value;
    cards[currentCardNumber].contact = contactInput.value;
    cards[currentCardNumber].image = avatarUrlInput.value;
    cards[currentCardNumber].color = colorInput.value;
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
  colorInput.value = getRandomColor();
})

let toggleModal = () => {
  modalEl.classList.toggle('card-edit-modal_active');
  nameInput.focus();
}

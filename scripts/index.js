import Card from './Card.js';
import * as utils from './utils.js'

const config = {
  cardTemplateSelector: '#card-template',
  cardItemSelector: '.card',
  titleSelector: '.card__person-name',
  professionSelector: '.card__person-profession',
  contactInfoSelector: '.card__person-contact-info',
  imgSelector: '.card__person-avatar',
  editButtonSelector: '.card__edit-button',
  deleteButtonSelector: '.card__delete-button',
  captureButtonSelector: '.card__capture-button',
  editModalSelector: '.modal_type_card',
  nameInputSelector: '#name-input',
  professionInputSelector: '#job-input',
  imgInputSelector: '#img-input',
  contactInputSelector: '#contact-input',
  colorInputSelector: '.js-color-input',
  textColorInputSelector: '.js-text-color-input',
  openModal: utils.openModal,
  captureCard, deleteCard, setCurrentCard,
}

let cardsDB = [];
let currentCardElement = {};
let isCardNew = false;

const modalCardEl = document.querySelector(".modal_type_card");
const modalPreviewEl = document.querySelector(".modal_type_preview");
const cardModalCloseButtonEl = document.querySelector(
  ".modal_type_card .modal__close-button"
);
const previewModalCloseButtonEl = document.querySelector(
  ".modal_type_preview .modal__close-button"
);
const cardAddButtonEl = document.querySelector(".card__add-button");
const exportButtonEl = document.querySelector(".export-button");
const captureWindow = document.querySelector(".capture-window");
const cardListEl = document.querySelector(".card-list");
const nameInput = document.querySelector(".js-name-input");
const professionInput = document.querySelector(".js-profession-input");
const avatarUrlInput = document.querySelector(".js-img-url-input");
const contactInput = document.querySelector(".js-contact-input");
const colorInput = document.querySelector(".js-color-input");
const textColorInput = document.querySelector(".js-text-color-input");
const formEl = document.querySelector("#card-form");

function generateFirstCard() {
  // add initial card to cards array
  cardsDB[0] = {
    name: 'Omri Ruvio',
    profession: 'Co-Founder & CEO @ CyberGames',
    contact: '+972.58.740.0020 | omri@cyber.games | cyber.games',
    image: './images/omri-avatar.svg',
    color: "#FAEBD7",
    textColor: "#000000",
    id: 0,
  }
}

function renderCardList() {
  // if local storage does not exist, add cards array to localstorage
  if ((localStorage.cardList == undefined) || (localStorage.cardList == 'undefined'))  {
    updateLocalStorage(cardsDB);
  } 
  // parse storage card list, for each card:
  // if the card is not marked as deleted => generate a card and append it.
  JSON.parse(localStorage.cardList).forEach(card => {
    if (!card.deleted) {

      const newCardElement = new Card(card, config).getCardElement();
      cardListEl.appendChild(newCardElement);
    }
  }) 
}

function updateLocalStorage(cardsDB) {
  const payload = JSON.stringify(cardsDB);
  localStorage.setItem('cardList', payload);
}

function createNewCard() {
  const card = {
    name: nameInput.value,
    profession: professionInput.value,
    contact: contactInput.value,
    image: avatarUrlInput.value,
    id: cardsDB.length,
    color: colorInput.value,
    textColor: textColorInput.value,
  };
  return card;
}

function createNewCardFromInput() {
  // calls a function that pulls the data from the user input and saves card obj in currentCard
  const currentCard = createNewCard();
  // saves card info in cards array
  cardsDB.push(currentCard);
  updateLocalStorage(cardsDB);

  const cardObj = new Card(currentCard, config);
  return cardObj.getCardElement();
}

function updateCard(card) {
  // if card is new create new card and add to array
  if (isCardNew) {
    cardListEl.appendChild(createNewCardFromInput());
    isCardNew = false;
  } else {
    // if card is not new (edit current card)

    // update html elements
    card.querySelector(".card__person-name").textContent = nameInput.value;
    card.querySelector(".card__person-profession").textContent = professionInput.value;
    card.querySelector(".card__person-avatar").src = avatarUrlInput.value;
    card.querySelector(".card__person-contact-info").textContent = contactInput.value;
    card.style.backgroundColor = colorInput.value;
    card.style.color = textColorInput.value;

    // update cardsDB information
    cardsDB[card.id].name = nameInput.value;
    cardsDB[card.id].profession = professionInput.value;
    cardsDB[card.id].contact = contactInput.value;
    cardsDB[card.id].image = avatarUrlInput.value;
    cardsDB[card.id].color = colorInput.value;
    cardsDB[card.id].textColor = textColorInput.value;
    updateLocalStorage(cardsDB);
  }
  utils.closeModal(modalCardEl);
}

function captureCard (event) {
  utils.openModal(modalPreviewEl);
  domtoimage.toSvg(this._cardElement, {filter: filterCardOverlays, style: {borderRadius: 'unset'}}).then(function (dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    captureWindow.replaceChildren(img);
    captureWindow.firstElementChild.style.maxWidth = '100%';
    captureWindow.firstElementChild.style.borderRadius = '20px';
  })

  function filterCardOverlays (node) { 
  // return true if current parsed node are not of button or div types
  // could probably be written in a better way but external library was handling things strangely
    if ((node.tagName)) {
      return ((node.tagName.toString().toLowerCase() !== 'button')&&(node.tagName.toString().toLowerCase() !== 'div'));
     }
     // if node is a text node return true
    else if (node.TEXT_NODE == 3) {return true}
  }
}

function deleteCard () {
  cardsDB[this.id].deleted = true;
  this._cardElement.remove();
  updateLocalStorage(cardsDB);
}

function downloadCanvas() {
  const img = captureWindow.firstElementChild;
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'my-business-card.svg'
  link.click();
}

exportButtonEl.addEventListener("click", downloadCanvas);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCard(currentCardElement);
});

function setCurrentCard () {
  currentCardElement = this._cardElement;
}


cardModalCloseButtonEl.addEventListener("click", () => {
  utils.closeModal(modalCardEl);
  isCardNew = false;
});

previewModalCloseButtonEl.addEventListener("click", () => {
  utils.closeModal(modalPreviewEl);
});

cardAddButtonEl.addEventListener("click", () => {
  utils.openModal(modalCardEl);
  isCardNew = true;
  nameInput.value = "Your name";
  professionInput.value = "Your profession / education";
  contactInput.value = "Your contact information";
  avatarUrlInput.value = utils.getRandomAvatarUrl();
  colorInput.value = utils.getRandomColor();
  textColorInput.value = "#000000";
});


modalCardEl.addEventListener('click', (event) => {
  if (event.currentTarget === event.target) utils.closeModal(event.currentTarget)
});

modalPreviewEl.addEventListener('click', (event) => {
  if (event.currentTarget === event.target) utils.closeModal(event.currentTarget)
});

document.addEventListener('keydown', (event) => {
  const currentModal = document.querySelector('.modal_active');
  if ((event.key == "Escape") && (currentModal)) {
    utils.closeModal(currentModal);
  }
})

modalCardEl.addEventListener('transitionend', (event) => {
  if (event.target.classList.contains('modal_active')) nameInput.focus();
});

function clearLocalStorage () {
  localStorage.cardList = undefined;
}

function initiateCardList () {
  if ((localStorage.cardList == 'undefined') || (localStorage.cardList == undefined)) {
    generateFirstCard()
  } else {
    cardsDB = (JSON.parse(localStorage.cardList))
  }

}

initiateCardList();

renderCardList();

// TODO:
// change listeners - remove global keyboard event listeners etc.
// reset form field errors after closing, set button to disabled when invalid
// split new card and edit card forms & split updateCard function logic accordingly
// remove global variable currentCardElement
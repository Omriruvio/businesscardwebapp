const cards = [];
let isCardNew = false;
let currentCardElement = document.querySelector(".card");
const randomAvatarLength = 12;

const cardEditButtonEl = document.querySelector(".card__edit-button");
const modalCardEl = document.querySelector(".modal_type_card");
const modalPreviewEl = document.querySelector(".modal_type_preview");
const cardModalCloseButtonEl = document.querySelector(".modal_type_card .modal__close-button");
const previewModalCloseButtonEl = document.querySelector(".modal_type_preview .modal__close-button");
const cardAddButtonEl = document.querySelector(".card__add-button");
const cardDeleteButtonEl = document.querySelector(".card__delete-button");

// declare the element of the "Capture" icon: //
const cardCaptureButtonEl = document.querySelector(".card__capture-button");

// declare the element of the Capture-window : //
const captureWindow = document.querySelector(".capture-window");

const cardPersonNameEL = document.querySelector(".card__person-name");
const cardPersonProfessionEL = document.querySelector(
  ".card__person-profession"
);
const cardPersonAvatarEL = document.querySelector(".card__person-avatar");
const cardPersonContactEL = document.querySelector(
  ".card__person-contact-info"
);
const cardPrototypeEl = document.querySelector(".card");
const cardListEl = document.querySelector(".card-list");
const nameInput = document.querySelector(".js-name-input");
const professionInput = document.querySelector(".js-profession-input");
const avatarUrlInput = document.querySelector(".js-img-url-input");
const contactInput = document.querySelector(".js-contact-input");
const colorInput = document.querySelector(".js-color-input");
const formEl = document.querySelector(".card-edit-form");
const pageElement = document.querySelector(".page");

cardPrototypeEl.id = 0;

// add initial card to cards array
cards[0] = {
  name: cardPersonNameEL.textContent,
  profession: cardPersonProfessionEL.textContent,
  contact: cardPersonContactEL.textContent,
  image: cardPersonAvatarEL.currentSrc,
  color: "#FAEBD7",
  serial: 0,
};

function toggleModal(modal) {
  modal.classList.toggle("modal_active");
  nameInput.focus();
}

function getRandomAvatarUrl() {
  let randomIndex = Math.floor(Math.random() * randomAvatarLength) + 1;
  let randomAvatarUrl = "./images/random-avatar-" + randomIndex + ".svg";
  return randomAvatarUrl;
}

function createNewCard() {
  const card = {
    name: nameInput.value,
    profession: professionInput.value,
    contact: contactInput.value,
    image: avatarUrlInput.value,
    serial: cards.length,
    color: colorInput.value,
  };
  return card;
}

function getCurrentCardElement(event) {
  const cardId = event.target.parentNode.id;
  currentCardElement = document.querySelector(".card-id-" + cardId);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handleEditButtonClick(event) {
  toggleModal(modalCardEl);
  getCurrentCardElement(event);
  const currentCardID = event.target.closest(".card").id;
  nameInput.value = cards[currentCardID].name;
  professionInput.value = cards[currentCardID].profession;
  contactInput.value = cards[currentCardID].contact;
  avatarUrlInput.value = cards[currentCardID].image;
  colorInput.value = cards[currentCardID].color;
}

function createNewCardFromInput() {
  // calls a function that pulls the data from the user input and saves card obj in currentCard
  const currentCard = createNewCard();
  // saves card info in cards array
  cards.push(currentCard);
  const newCardElement = cardPrototypeEl.cloneNode(true);
  newCardElement.classList.remove("card-id-0");
  newCardElement.classList.add("card" + "-id-" + currentCard.serial);
  newCardElement.querySelector(".card__person-name").textContent = currentCard.name;
  newCardElement.querySelector(".card__person-profession").textContent = currentCard.profession;
  newCardElement.querySelector(".card__person-avatar").src = currentCard.image;
  newCardElement.querySelector(".card__person-contact-info").textContent = currentCard.contact;
  newCardElement.style.backgroundColor = currentCard.color;
  newCardElement.id = currentCard.serial;
  newCardElement
    .querySelector(".card__edit-button")
    .addEventListener("click", (event) => handleEditButtonClick(event));
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => {
      getCurrentCardElement(event);
      currentCardElement.remove();
      // add remove card from cards array
    });
  newCardElement
    .querySelector(".card__capture-button")
    .addEventListener("click", (event) => {
      toggleModal(modalPreviewEl);
      getCurrentCardElement(event);
      html2canvas(currentCardElement).then(function (canvas) {
        captureWindow.replaceChildren(canvas);
      });
    });
  return newCardElement;
}

// add click outside modal to close functinoality

function updateCard(card) {
  // if card is new create new card and add to array
  if (isCardNew) {
    cardListEl.appendChild(createNewCardFromInput());
    isCardNew = false;
  } else {
    // if card is not new
    card.querySelector(".card__person-name").textContent = nameInput.value;
    card.querySelector(".card__person-profession").textContent =
      professionInput.value;
    card.querySelector(".card__person-avatar").src = avatarUrlInput.value;
    card.querySelector(".card__person-contact-info").textContent =
      contactInput.value;
    card.style.backgroundColor = colorInput.value;
    cards[card.id].name = nameInput.value;
    cards[card.id].profession = professionInput.value;
    cards[card.id].contact = contactInput.value;
    cards[card.id].image = avatarUrlInput.value;
    cards[card.id].color = colorInput.value;
  }
  toggleModal(modalCardEl);
}

cardEditButtonEl.addEventListener("click", (event) =>
  handleEditButtonClick(event)
);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCard(currentCardElement);
});

cardDeleteButtonEl.addEventListener("click", (event) => {
  getCurrentCardElement(event);
  currentCardElement.remove();
});

cardModalCloseButtonEl.addEventListener("click", () => {
  toggleModal(modalCardEl);
  isCardNew = false;
});

previewModalCloseButtonEl.addEventListener("click", () => {
  toggleModal(modalPreviewEl);
});



cardAddButtonEl.addEventListener("click", () => {
  toggleModal(modalCardEl);
  isCardNew = true;
  nameInput.value = "Your name";
  professionInput.value = "Your profession / education";
  contactInput.value = "Your contact information";
  avatarUrlInput.value = getRandomAvatarUrl();
  colorInput.value = getRandomColor();
});

cardCaptureButtonEl.addEventListener("click", (event) => {
  toggleModal(modalPreviewEl);
  getCurrentCardElement(event);
  html2canvas(currentCardElement).then(function (canvas) {
    captureWindow.replaceChildren(canvas);
  });
});

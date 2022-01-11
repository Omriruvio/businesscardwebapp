const cards = [];
let isCardNew = false;
let currentCardElement = document.querySelector(".card");
const randomAvatarLength = 12;

const cardEditButtonEl = document.querySelector(".card__edit-button");
const modalCardEl = document.querySelector(".modal_type_card");
const modalPreviewEl = document.querySelector(".modal_type_preview");
const cardModalCloseButtonEl = document.querySelector(
  ".modal_type_card .modal__close-button"
);
const previewModalCloseButtonEl = document.querySelector(
  ".modal_type_preview .modal__close-button"
);
const cardAddButtonEl = document.querySelector(".card__add-button");
const cardDeleteButtonEl = document.querySelector(".card__delete-button");
const exportButtonEl = document.querySelector(".export-button");

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
const textColorInput = document.querySelector(".js-text-color-input");
const formEl = document.querySelector("#card-form");
const pageElement = document.querySelector(".page");
const confirmBannerEl = document.querySelector(".confirm-banner");
const confirmBannerWrapper = document.querySelector(".confirm-banner__wrapper");
const confirmButtonDelete = document.querySelector(".button_type_confirm");
const confirmButtonCancel = document.querySelector(".button_type_cancel");

cardPrototypeEl.id = 0;

// add initial card to cards array
cards[0] = {
  name: cardPersonNameEL.textContent,
  profession: cardPersonProfessionEL.textContent,
  contact: cardPersonContactEL.textContent,
  image: cardPersonAvatarEL.currentSrc,
  color: "#FAEBD7",
  textcolor: "#000000",
  serial: 0,
};

function openModal(modal) {
  modal.classList.add('modal_active');
  focusInput(nameInput);
}

function focusInput(input) {
  ally.when.focusable({
    context: input,
    callback: function(element) {
      element.focus();
    }
  });
}

function closeModal(modal) {
  modal.classList.remove('modal_active');
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
    textcolor: textColorInput.value,
  };
  return card;
}

function getCurrentCardElement(event) {
  const cardId = event.target.closest('.card').id;
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
  openModal(modalCardEl);
  getCurrentCardElement(event);
  const currentCardID = event.target.closest(".card").id;
  nameInput.value = cards[currentCardID].name;
  professionInput.value = cards[currentCardID].profession;
  contactInput.value = cards[currentCardID].contact;
  avatarUrlInput.value = cards[currentCardID].image;
  colorInput.value = cards[currentCardID].color;
  textColorInput.value = cards[currentCardID].textcolor;
}

function createNewCardFromInput() {
  // calls a function that pulls the data from the user input and saves card obj in currentCard
  const currentCard = createNewCard();
  // saves card info in cards array
  cards.push(currentCard);
  const newCardElement = cardPrototypeEl.cloneNode(true);
  newCardElement.classList.remove("card-id-0");
  newCardElement.classList.add("card" + "-id-" + currentCard.serial);
  newCardElement.querySelector(".card__person-name").textContent =
    currentCard.name;
  newCardElement.querySelector(".card__person-profession").textContent =
    currentCard.profession;
  newCardElement.querySelector(".card__person-avatar").src = currentCard.image;
  newCardElement.querySelector(".card__person-contact-info").textContent =
    currentCard.contact;
  newCardElement.style.backgroundColor = currentCard.color;
  newCardElement.style.color = currentCard.textcolor;
  newCardElement.id = currentCard.serial;
  newCardElement
    .querySelector(".card__edit-button")
    .addEventListener("click", (event) => handleEditButtonClick(event));
  newCardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => {
      handleDeleteButtonClick(event);
    });
  newCardElement.querySelector(".card__capture-button").addEventListener("click", handleCaptureClick);
  return newCardElement;
}

function updateCard(card) {
  // if card is new create new card and add to array
  if (isCardNew) {
    cardListEl.appendChild(createNewCardFromInput());
    isCardNew = false;
  } else {
    // if card is not new
    card.querySelector(".card__person-name").textContent = nameInput.value;
    card.querySelector(".card__person-profession").textContent = professionInput.value;
    card.querySelector(".card__person-avatar").src = avatarUrlInput.value;
    card.querySelector(".card__person-contact-info").textContent = contactInput.value;
    card.style.backgroundColor = colorInput.value;
    card.style.color = textColorInput.value;
    cards[card.id].name = nameInput.value;
    cards[card.id].profession = professionInput.value;
    cards[card.id].contact = contactInput.value;
    cards[card.id].image = avatarUrlInput.value;
    cards[card.id].color = colorInput.value;
    cards[card.id].textcolor = textColorInput.value;
  }
  closeModal(modalCardEl);
}

function toggleConfirmBanner(card) {
  const confirmBanner = card.querySelector('.confirm-banner');
  const confirmWrapper = card.querySelector('.confirm-banner__wrapper');
  confirmBanner.classList.toggle('confirm-banner_active');
  confirmWrapper.classList.toggle('confirm-banner__wrapper_active');
  const confirmDeleteButton = card.querySelector('.button_type_confirm');
  const cancelDeleteButton = card.querySelector('.button_type_cancel');

  function handleConfirmClick (event) {
    getCurrentCardElement(event); 
    confirmBanner.classList.remove('confirm-banner_active');
    confirmWrapper.classList.remove('confirm-banner__wrapper_active');
    currentCardElement.remove()
  }

  function handleCancelClick (event) {
    confirmBanner.classList.remove('confirm-banner_active');
    confirmWrapper.classList.remove('confirm-banner__wrapper_active');
    confirmDeleteButton.removeEventListener('click', handleConfirmClick);
    cancelDeleteButton.removeEventListener('click', handleCancelClick);
  }
  confirmDeleteButton.addEventListener('click', handleConfirmClick);
  cancelDeleteButton.addEventListener('click', handleCancelClick);

}

function handleDeleteButtonClick(event) {
  getCurrentCardElement(event);
  toggleConfirmBanner(currentCardElement);
}

function handleCaptureClick (event) {
  openModal(modalPreviewEl);
  getCurrentCardElement(event);
  domtoimage.toSvg(currentCardElement, {filter: filterCardOverlays}).then(function (dataUrl) {
    const img = new Image();
    img.src = dataUrl;
    captureWindow.replaceChildren(img);
    captureWindow.firstElementChild.style.maxWidth = '100%';
  })

  function filterCardOverlays (node) { 
  // return true if current parsed node are not of button or div types
  // could probably be written in a better way but external library was handling things strangely
    if ((node.tagName)) {
      return ((node.tagName.toString().toLowerCase() !== 'button')&&(node.tagName.toString().toLowerCase() !== 'div'));
     }
    else if (node.TEXT_NODE == 3) {return true}
  }
}

function downloadCanvas() {
  const img = captureWindow.firstElementChild;
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'my-business-card.svg'
  link.click();

}

exportButtonEl.addEventListener("click", downloadCanvas);

cardEditButtonEl.addEventListener("click", handleEditButtonClick);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCard(currentCardElement);
});

cardDeleteButtonEl.addEventListener("click", handleDeleteButtonClick);

cardModalCloseButtonEl.addEventListener("click", () => {
  closeModal(modalCardEl);
  isCardNew = false;
});

previewModalCloseButtonEl.addEventListener("click", () => {
  closeModal(modalPreviewEl);
});

cardAddButtonEl.addEventListener("click", () => {
  openModal(modalCardEl);
  isCardNew = true;
  nameInput.value = "Your name";
  professionInput.value = "Your profession / education";
  contactInput.value = "Your contact information";
  avatarUrlInput.value = getRandomAvatarUrl();
  colorInput.value = getRandomColor();
  textColorInput.value = "#000000";
});

cardCaptureButtonEl.addEventListener("click", handleCaptureClick);

modalCardEl.addEventListener('click', (event) => {
  if (event.currentTarget === event.target) closeModal(event.currentTarget)
});

modalPreviewEl.addEventListener('click', (event) => {
  if (event.currentTarget === event.target) closeModal(event.currentTarget)
});

document.addEventListener('keydown', (event) => {
  const currentModal = document.querySelector('.modal_active');
  if ((event.key == "Escape") && (currentModal)) {
    closeModal(currentModal);
  }
})




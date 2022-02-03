export default class Card {
  constructor (card, config) {
    // card information & style
    this._name = card.name;
    this._profession = card.profession;
    this._contact = card.contact;
    this._imgSrc = card.image;
    this.id = card.id;
    this._color = card.color;
    this._textColor = card.textColor;
    // selectors
    this._cardTemplateSelector = config.cardTemplateSelector;
    this._cardItemSelector = config.cardItemSelector;
    this._titleSelector = config.titleSelector;
    this._professionSelector = config.professionSelector;
    this._contactInfoSelector = config.contactInfoSelector;
    this._imageSelector = config.imgSelector;
    this._editButtonSelector = config.editButtonSelector;
    this._deleteButtonSelector = config.deleteButtonSelector;
    this._captureButtonSelector = config.captureButtonSelector;
    this._editModalSelector = config.editModalSelector;
    this._nameInputSelector = config.nameInputSelector;
    this._professionInputSelector = config.professionInputSelector;
    this._imgInputSelector = config.imgInputSelector;
    this._contactInputSelector = config.contactInputSelector;
    this._colorInputSelector = config.colorInputSelector;
    this._textColorInputSelector = config.textColorInputSelector;
    // functions
    this._openModal = config.openModal;
    this._captureCard = config.captureCard;
  }


  _getCardFromTemplate = () => {
    const newCard =  document.querySelector(this._cardTemplateSelector)
                      .content
                      .querySelector(this._cardItemSelector)
                      .cloneNode(true)
    newCard.classList.replace('card-id', `card-id-${this.id}`)
    return newCard;
  }

  _populateCardInfo =  () => {
    this._cardElement.querySelector(this._titleSelector).textContent = this._name;
    this._cardElement.querySelector(this._professionSelector).textContent = this._profession;
    this._cardElement.querySelector(this._contactInfoSelector).textContent = this._contact;
    this._cardElement.querySelector(this._imageSelector).src = this._imgSrc;
    this._cardElement.style.backgroundColor = this._color;
    this._cardElement.style.color = this._textColor;
  }



  _handleEditClick = () => {
    this._openModal(this._editModalElement);
    // populate form fields with current card information
    this._nameInput.value = this._name;
    this._professionInput.value = this._profession;
    this._imgInput.value = this._imgSrc;
    this._contactInput.value = this._contact;
    this._colorInput.value = this._color;
    this._textColorInput = this._textColor;
  }

  _handleDeleteClick = () => {
    this.toggleConfirmBanner();
  }

  toggleConfirmBanner = () => {
    
    this._confirmBanner.classList.toggle('confirm-banner_active');
    this._confirmWrapper.classList.toggle('confirm-banner__wrapper_active');

      
    this._confirmDeleteButton.addEventListener('click', this._handleConfirmClick);
    this._cancelDeleteButton.addEventListener('click', this._handleCancelClick);
  }

  _handleCancelClick = () => {
    this._confirmBanner.classList.remove('confirm-banner_active');
    this._confirmWrapper.classList.remove('confirm-banner__wrapper_active');
    this._confirmDeleteButton.removeEventListener('click', this._handleConfirmClick);
    this._cancelDeleteButton.removeEventListener('click', this._handleCancelClick);
  }

  _handleConfirmClick = () => {
    this._confirmBanner.classList.remove('confirm-banner_active');
    this._confirmWrapper.classList.remove('confirm-banner__wrapper_active');
    
    // TODO: handle card database - remove card from cards list
    this.deleted = true;

    // cards.splice(cards.find(card => card.serial == event.target.closest('.card').id).serial, 1)
    // cards.find(card => this._cardElementid == event.target.closest('.card').id).deleted = true;
    // cards.splice(event.target.closest('.card').id, 1)
    this._cardElement.remove()
    // updateLocalStorage(cards);
  }

  _handleCaptureClick = () => {
    this._captureCard();
  }


  
  _setEventListners = () => {
    this._editModalElement = document.querySelector(this._editModalSelector);
    this._nameInput = this._editModalElement.querySelector(this._nameInputSelector);
    this._professionInput = this._editModalElement.querySelector(this._professionInputSelector);
    this._imgInput = this._editModalElement.querySelector(this._imgInputSelector);
    this._contactInput = this._editModalElement.querySelector(this._contactInputSelector);
    this._colorInput = this._editModalElement.querySelector(this._colorInputSelector);
    this._textColorInput = this._editModalElement.querySelector(this.textColorInputSelector);
    this._confirmBanner = this._cardElement.querySelector('.confirm-banner');
    this._confirmWrapper = this._cardElement.querySelector('.confirm-banner__wrapper');
    this._confirmDeleteButton = this._cardElement.querySelector('.button_type_confirm');
    this._cancelDeleteButton = this._cardElement.querySelector('.button_type_cancel');

    this._editButton = this._cardElement.querySelector(this._editButtonSelector);
    this._editButton.addEventListener('click', () => this._handleEditClick());

    this._deleteButton = this._cardElement.querySelector(this._deleteButtonSelector);
    this._deleteButton.addEventListener('click', this._handleDeleteClick);

    this._captureButton = this._cardElement.querySelector(this._captureButtonSelector);
    this._captureButton.addEventListener('click', this._handleCaptureClick);
  }

  updateCard = (card) => {
    this._name = card.name;
    this._profession = card.profession;
    this._contact = card.contact;
    this._imgSrc = card.image;
    this.id = card.id;
    this._color = card.color;
    this._textColor = card.textColor;
    this._populateCardInfo()
  }
  
  getCardElement = () => {
    this._cardElement = this._getCardFromTemplate();
    this._populateCardInfo();
    this._setEventListners();
    return this._cardElement;
  }

}
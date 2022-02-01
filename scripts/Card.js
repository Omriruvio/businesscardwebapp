export default class Card {
  constructor (card, config) {
    this._name = card.name;
    this._profession = card.profession;
    this._contact = card.contact;
    this._imgSrc = card.image;
    this._id = card.id;
    this._color = card.color;
    this._textColor = card.textColor;

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
    
    this._openModal = config.openModal;
    this._editModalElement = document.querySelector(this._editModalSelector);
  }


  _getCardFromTemplate () {
    // debugger;
    return document.querySelector(this._cardTemplateSelector)
                   .content
                   .querySelector(this._cardItemSelector)
                   .cloneNode(true)
  }

  _populateCardInfo () {
    this._cardElement.querySelector(this._titleSelector).textContent = this._name;
    this._cardElement.querySelector(this._professionSelector).textContent = this._profession;
    this._cardElement.querySelector(this._contactInfoSelector).textContent = this._contact;
    this._cardElement.querySelector(this._imageSelector).src = this._imgSrc;

  }

  _handleEditClick () {
    this._openModal(this._editModalElement);
  }

  _handleDeleteClick () {

  }

  _handleCaptureClick () {

  }


  
  _setEventListners () {
    this._editButton = this._cardElement.querySelector(this._editButtonSelector);
    this._editButton.addEventListener('click', () => this._handleEditClick());

    this._deleteButton = this._cardElement.querySelector(this._deleteButtonSelector);
    this._deleteButton.addEventListener('click', this._handleDeleteClick);

    this._captureButton = this._cardElement.querySelector(this._captureButtonSelector);
    this._captureButton.addEventListener('click', this._handleCaptureClick);
  }
  
  getCardElement () {
    this._cardElement = this._getCardFromTemplate();
    this._populateCardInfo();
    this._setEventListners();

    return this._cardElement;
  }

}
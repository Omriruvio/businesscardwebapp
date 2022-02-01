export default class Card {
  constructor (card, config) {
    this._name = card.name;
    this._profession = card.profession;
    this._contact = card.contact;
    this._imgSrc = card.image;
    this._color = card.color;
    this._textColor = card.textColor;

    this._cardTemplateSelector = config.cardTemplateSelector;
    this._cardItemSelector = config.cardItemSelector;
    this._titleSelector = config.titleSelector;
    this._professionSelector = config.professionSelector;
    this._contactInfoSelector = config.contactInfoSelector;
    this._imageSelector = config.imgSelector;
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
  
  _setEventListners () {
    
  }
  
  getCardElement () {
    this._cardElement = this._getCardFromTemplate();
    this._populateCardInfo();
    this._setEventListners();

    return this._cardElement;
  }

}
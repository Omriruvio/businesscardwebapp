const config = {
  fieldSelector: '.card-edit-form__input-field',
  formSelector:  '.form'
}

function validateForm(form, fields, config) {
  
}

function toggleButton(form, fields, button, config) {

}

function isFieldValid(field) {
  return (field.validity.valid);
}

function getShortErrorMessage (field) {
  return (
    field.validity.badInput ? 'Incorrect input.' :
    field.validity.tooLong ? 'Text too long.' :
    field.validity.tooShort ? 'Text too short.' :
    field.validity.valueMissing ? 'Please fill this field.' : 
    field.validationMessage)
}

function showError(field, error) {
  error.textContent = getShortErrorMessage(field);
}

function hideError(field, error) {
  error.textContent = '';
}

function validateField(form, field) {
  const error = form.querySelector(`#${field.id}-error`);
  if (!isFieldValid(field)) {showError(field, error)} else {hideError(field, error)}
}

function setFormListeners(form, config) {
  const fields = Array.from(form.querySelectorAll(config.fieldSelector));
  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(form, field))
  })
}

function initiateValidation() {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => { setFormListeners(form, config) });
}

initiateValidation();

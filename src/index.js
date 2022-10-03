import { validateFormData } from './utils/useForm.js';

const userInfoFormElement = document.querySelector('#userInfo');
const userInfoFormInputElements = userInfoFormElement.querySelectorAll('.form__input');
const submitBtnElement = userInfoFormElement.querySelector('button[type="submit"]');
const successElement = userInfoFormElement.querySelector('.form__validation--success');
const FORM_VALIDATION_ERROR_CLASS = 'form__validation--error';
const FORM_IS_VALIDATION_CLASS = 'form__validation--show';

userInfoFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  let formData = new FormData(event.target);
  let customFormData = [];

  formData.forEach((item, name) => {
    const input = event.target.querySelector(`input[name=${name}]`);
    customFormData.push({
      name,
      value: String(item),
      validationRule: input.getAttribute('data-validation-rule'),
    });
  })

  const invalidFields = validateFormData(customFormData);

  if(invalidFields.length) {
    successElement.classList.remove(FORM_IS_VALIDATION_CLASS);
    invalidFields.forEach(invalidField => {
      let errorElement = event.target.querySelector(`input[name=${invalidField.name}] + .${FORM_VALIDATION_ERROR_CLASS}`);
      errorElement.classList.add(FORM_IS_VALIDATION_CLASS);
      errorElement.innerHTML = invalidField.errorMessage;
    })

    submitBtnElement.setAttribute('disabled', 'disabled');
    return;
  }

  successElement.classList.add(FORM_IS_VALIDATION_CLASS);
})

userInfoFormInputElements.forEach(userInfoFormInputElement => {
  userInfoFormInputElement.addEventListener('input', (event) => {
    submitBtnElement.removeAttribute('disabled');
    successElement.classList.remove(FORM_IS_VALIDATION_CLASS);
    const errorElement = event.target.nextElementSibling;
    if(errorElement.classList.contains(FORM_IS_VALIDATION_CLASS)) {
      errorElement.classList.remove(FORM_IS_VALIDATION_CLASS)
    }
  })
})

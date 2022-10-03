export const formValidationRules = {
  name: {
    rule: /[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/,
    errorMessage: 'The full name must have two word and the first letter of every word a symbol uppercase.',
  },
  phone: {
    rule: /[+][0-9]{12}$/,
    errorMessage: 'Wrong phone number format, valid format for example +380123456789.',
  },
  email: {
    rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: 'Field email must have formatted emailName@mailBoxName.com.',
  },
  card: {
    rule: /[0-9]{16}$/,
    errorMessage: 'Card number length must have 16 numbers.',
  },
}

export const validateFormData = (formData) => formData
  .filter(formDataItem => !formValidationRules[formDataItem.validationRule].rule.test(String(formDataItem.value)))
  .map(invalidFormField => ({
    name: invalidFormField.name,
    errorMessage: formValidationRules[invalidFormField.validationRule].errorMessage,
  }));


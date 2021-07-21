const EMAIL_REG_EXP = /.+@.+\..+/i;
const PHONE_REG_EXP = /^\+?\d+[0-9-]{5,15}$/;
function validate(element): string {
  let validateResult: string = '';
  switch (element.type) {
    case 'email':
      if (!element.value.match(EMAIL_REG_EXP)) {
        validateResult = 'Email должен содержать знаки @ и .';
      }
      break;
    case 'text':
      if (element.value.length < 2 || element.value.lenth > 20) {
        validateResult = 'Длина поля должна быть более 1 и менее 20 символов';
      }
      break;
    case 'tel':
      if (!element.value.match(PHONE_REG_EXP)) {
        validateResult = 'Номер телефона должен содержать только цифры и символы + или - и содержать не менее 5 цифр';
      }
      break;
    default:
      validateResult = 'valid';
  }
  return validateResult;
}

export default validate;

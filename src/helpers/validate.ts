const EMAIL_REG_EXP = /.+@.+\..+/i;
const PHONE_REG_EXP = /^\+?\d+[0-9-]{5,15}$/;

export function toggleErrorElement(element: HTMLInputElement, validateResult: string) {
  const errorElement = element.closest('form')?.querySelector(`[data-error="${element.name}"]`);
  if (errorElement) {
    if (validateResult !== 'valid') {
      errorElement.textContent = validateResult;
      errorElement.classList.remove('hide');
    } else {
      errorElement.classList.add('hide');
    }
  }
}

export function validate(element: HTMLInputElement): string {
  let validateResult: string = '';
  switch (element.type) {
    case 'email':
      if (!element.value.match(EMAIL_REG_EXP)) {
        validateResult = 'Email должен содержать знаки @ и .';
      }
      break;
    case 'text':
      if (element.value.length < 2 || element.value.length > 20) {
        validateResult = 'Длина поля должна быть более 1 и менее 20 символов';
      }
      break;
    case 'tel':
      if (!element.value.match(PHONE_REG_EXP)) {
        validateResult = `Номер телефона должен содержать только цифры и 
        символы + или - и содержать не менее 5 цифр`;
      }
      break;
    case 'password':
      if (element.name === 'password2') {
        const form = element.closest('form');
        if (form?.password && form?.password.value !== element.value) {
          validateResult = 'Пароли не совпадают';
        }
      }
      if (element.value.length < 8) {
        validateResult = 'Пароль должен содержать не менее 8 символов';
      }
      break;
    default:
      validateResult = 'valid';
  }
  toggleErrorElement(element, validateResult);
  return validateResult;
}

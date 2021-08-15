"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.toggleErrorElement = void 0;
const EMAIL_REG_EXP = /.+@.+\..+/i;
const PHONE_REG_EXP = /^\+?\d+[0-9-]{5,15}$/;
function toggleErrorElement(element, validateResult) {
    var _a;
    const errorElement = (_a = element
        .closest('form')) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-error="${element.name}"]`);
    if (errorElement) {
        if (validateResult !== 'valid') {
            errorElement.textContent = validateResult;
            errorElement.classList.remove('hide');
        }
        else {
            errorElement.classList.add('hide');
        }
    }
}
exports.toggleErrorElement = toggleErrorElement;
function validate(element) {
    let validateResult = 'valid';
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
                if ((form === null || form === void 0 ? void 0 : form.password) && (form === null || form === void 0 ? void 0 : form.password.value) !== element.value) {
                    validateResult = 'Пароли не совпадают';
                }
            }
            if (element.value.length < 8) {
                validateResult = 'Пароль должен содержать не менее 8 символов';
            }
            break;
        default:
    }
    toggleErrorElement(element, validateResult);
    return validateResult;
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map
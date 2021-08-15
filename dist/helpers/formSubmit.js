"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./validate");
function handleSubmit(e) {
    e.preventDefault();
    let formDataValid = true;
    const formData = {};
    const target = e.currentTarget;
    const { elements } = target;
    for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i];
        const validateResult = validate_1.validate(element);
        formDataValid = formDataValid && validateResult === 'valid';
        if (element.type !== 'submit') {
            formData[element.name] = element.value;
        }
    }
    // eslint-disable-next-line no-console
    console.log(formData);
    return formDataValid ? formData : null;
}
exports.default = handleSubmit;
//# sourceMappingURL=formSubmit.js.map
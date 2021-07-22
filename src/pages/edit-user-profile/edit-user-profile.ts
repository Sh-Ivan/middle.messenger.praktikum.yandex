/* eslint-disable class-methods-use-this */
import Templator from '../../../utils/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block from '../../components/block/block';
import { validate, toggleErrorElement } from '../../../utils/validate';

const editUserProfileTmpl = new Templator(editUserProfileTemplate);
const initialContext = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  displayName: '',
  phone: '',
};

class EditUserProfile extends Block {
  constructor(props: object = {}) {
    super('div', props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    const { elements } = e.currentTarget as HTMLElement;
    for (const element of elements) {
      const validateResult = validate(element);
      toggleErrorElement(element, validateResult);

      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
  }

  handleFocus(e) {
    const element = e.target;
    const validateResult = validate(element);
    toggleErrorElement(element, validateResult);
  }

  handleBlur(e) {
    const element = e.target;
    const validateResult = validate(element);
    toggleErrorElement(element, validateResult);
  }

  render() {
    const context = { ...initialContext };
    return editUserProfileTmpl.compile(context);
  }
}

export default EditUserProfile;

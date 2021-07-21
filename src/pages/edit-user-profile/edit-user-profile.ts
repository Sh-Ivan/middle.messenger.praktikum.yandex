/* eslint-disable class-methods-use-this */
import Templator from '../../../utils/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block from '../../components/block/block';
import validate from '../../../utils/validate';

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
  constructor(props) {
    super('div', props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    const { elements } = e.currentTarget as HTMLElement;
    for (const element of elements) {
      const errorElement = document.querySelector(`[data-error="${element.name}"]`);
      const validateResult = validate(element);
      if (errorElement) {
        if (validateResult !== 'valid') {
          errorElement.textContent = validateResult;
          errorElement.classList.remove('hide');
        } else {
          errorElement.classList.add('hide');
        }
      }

      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
  }

  handleFocus(e) {
    const element = e.target;
    const errorElement = document.querySelector(`[data-error="${element.name}"]`);
    const validateResult = validate(element);
    if (errorElement) {
      if (validateResult !== 'valid') {
        errorElement.textContent = validateResult;
        errorElement.classList.remove('hide');
      } else {
        errorElement.classList.add('hide');
      }
    }
  }

  handleBlur(e) {
    const element = e.target;
    const errorElement = document.querySelector(`[data-error="${element.name}"]`);
    const validateResult = validate(element);
    if (errorElement) {
      if (validateResult !== 'valid') {
        errorElement.textContent = validateResult;
        errorElement.classList.remove('hide');
      } else {
        errorElement.classList.add('hide');
      }
    }
  }

  render() {
    const context = { ...initialContext, ...this.props.context };
    return editUserProfileTmpl.compile(context);
  }
}

export default EditUserProfile;

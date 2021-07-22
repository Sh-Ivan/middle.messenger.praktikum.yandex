import Templator from '../../../utils/templator';
import changePasswordTemplate from './change-password.tmpl';
import Block from '../../components/block/block';
import { validate } from '../../../utils/validate';

const changePasswordTmpl = new Templator(changePasswordTemplate);

class ChangePassword extends Block {
  constructor(props: object = {}) {
    super('div', props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    const { elements } = e.currentTarget;
    for (const element of elements) {
      const validateResult = validate(element);
      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
  }

  handleFocus(e) {
    const element = e.target;
    const validateResult = validate(element);
  }

  handleBlur(e) {
    const element = e.target;
    const validateResult = validate(element);
  }

  render() {
    return changePasswordTmpl.compile(this.props);
  }
}

export default ChangePassword;

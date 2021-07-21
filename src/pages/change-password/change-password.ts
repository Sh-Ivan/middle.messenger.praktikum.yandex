import Templator from '../../../utils/templator';
import changePasswordTemplate from './change-password.tmpl';
import Block from '../../components/block/block';

const changePasswordTmpl = new Templator(changePasswordTemplate);

class ChangePassword extends Block {
  constructor(props) {
    super('div', props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    const { elements } = e.currentTarget;
    for (const element of elements) {
      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
  }

  render() {
    return changePasswordTmpl.compile(this.props);
  }
}

export default ChangePassword;

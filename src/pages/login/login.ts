/* eslint-disable class-methods-use-this */
import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';
import { validate } from '../../../utils/validate';

const loginTmpl = new Templator(loginTemplate);

class Login extends Block {
  constructor(props) {
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
    const context = {};
    return loginTmpl.compile(context);
  }
}

export default Login;

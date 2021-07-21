/* eslint-disable class-methods-use-this */
import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';

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
      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
  }

  render() {
    const context = {};
    return loginTmpl.compile(context);
  }
}

export default Login;

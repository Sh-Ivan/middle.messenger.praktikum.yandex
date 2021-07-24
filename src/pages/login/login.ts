/* eslint-disable class-methods-use-this */
import Templator from '../../helpers/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';

const loginTmpl = new Templator(loginTemplate);

type loginProps = {
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class Login extends Block<loginProps> {
  constructor(props: loginProps) {
    super('div', props);
  }

  render() {
    const context = {};
    return loginTmpl.compile(context);
  }
}

export default Login;

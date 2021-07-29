import Templator from '../../helpers/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';
import Button from '../../components/Button/Button';

const loginTmpl = new Templator(loginTemplate);

type blockProps

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
    const context = {
      loginButton: new Button({
        class: 'auth-form__button',
        text: 'Авторизоваться',
        type: 'submit',
      }).textContent,
    };
    return loginTmpl.compile(context);
  }
}

export default Login;

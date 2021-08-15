import Templator from '../../helpers/templator';
import loginTemplate from './login.tmpl';
import Block, { TProps } from '../../components/block/block';
import Button from '../../components/Button/Button';
import handleSubmit from '../../helpers/formSubmit';
import { handleFocus, handleBlur } from '../../helpers/inputValidate';
import AuthController from '../../controllers/auth-controller';
import AppRouter from '../../components/App';

const loginTmpl = new Templator(loginTemplate);
const authController = new AuthController();

type loginProps = {
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class Login extends Block<loginProps> {
  constructor(props: loginProps) {
    super('div', {
      ...props,
      handleBlur,
      handleFocus,
      handleSubmit: (e: Event) => {
        const data = handleSubmit(e);
        if (data !== null) {
          authController.login(data);
        }
      },
    });
  }

  componentDidMount() {
    authController
      .getUserInfo((user: TProps) => {
        this.setProps({ user });
      })
      .then((user: TProps) => {
        if (user) {
          AppRouter.go('/');
        }
      });
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

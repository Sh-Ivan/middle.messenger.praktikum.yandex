import Templator from '../../helpers/templator';
import signupTemplate from './signup.tmpl';
import Block from '../../components/block/block';
import Button from '../../components/Button/Button';
import handleSubmit from '../../helpers/formSubmit';
import { handleFocus, handleBlur } from '../../helpers/inputValidate';
import signupController from '../../controllers/signup-controller';

const signupTmpl = new Templator(signupTemplate);

type signupdProps = {
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class Signup extends Block<signupdProps> {
  constructor(props: signupdProps) {
    super('div', {
      ...props,
      handleBlur,
      handleFocus,
      handleSubmit: (e: Event) => {
        const data = handleSubmit(e);
        if (data !== null) {
          signupController(data);
        }
      },
    });
  }

  render() {
    const context = {
      signupButton: new Button({
        class: 'auth-form__button',
        text: 'Зарегистрироваться',
        type: 'submit',
      }).textContent,
    };
    return signupTmpl.compile(context);
  }
}

export default Signup;

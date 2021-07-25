import Templator from '../../helpers/templator';
import signupTemplate from './signup.tmpl';
import Block from '../../components/block/block';
import Button from '../../components/Button/Button';

const signupTmpl = new Templator(signupTemplate);

type signupdProps = {
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class Signup extends Block<signupdProps> {
  constructor(props: signupdProps) {
    super('div', props);
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

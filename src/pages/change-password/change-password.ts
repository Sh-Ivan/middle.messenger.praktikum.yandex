import Templator from '../../helpers/templator';
import changePasswordTemplate from './change-password.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';
import Button from '../../components/Button/Button';

const changePasswordTmpl = new Templator(changePasswordTemplate);

type changePasswordProps = {
  user?: TUser;
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class ChangePassword extends Block<changePasswordProps> {
  constructor(props: changePasswordProps) {
    super('div', props);
  }

  render() {
    const context = {
      saveButton: new Button({
        class: 'auth-form__button',
        text: 'Сохранить',
        type: 'submit',
      }).textContent,
    };
    return changePasswordTmpl.compile(context);
  }
}

export default ChangePassword;

import Templator from '../../helpers/templator';
import changePasswordTemplate from './change-password.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';
import Button from '../../components/Button/Button';
import handleSubmit from '../../helpers/formSubmit';
import { handleFocus, handleBlur } from '../../helpers/inputValidate';
import UserController from '../../controllers/user-controller';

const changePasswordTmpl = new Templator(changePasswordTemplate);
const userController = new UserController();

type changePasswordProps = {
  user?: TUser;
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class ChangePassword extends Block<changePasswordProps> {
  constructor(props: changePasswordProps) {
    super('div', {
      ...props,
      handleFocus,
      handleBlur,
      handleSubmit: (e: Event) => {
        const data = handleSubmit(e);
        if (data !== null) {
          const { oldPassword, password: newPassword } = data;
          userController.changePassword({ oldPassword, newPassword });
        }
      },
    });
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

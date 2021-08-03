/* eslint-disable class-methods-use-this */
import Templator from '../../helpers/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import Button from '../../components/Button/Button';
import handleSubmit from '../../helpers/formSubmit';
import { handleFocus, handleBlur } from '../../helpers/inputValidate';
import AuthController from '../../controllers/auth-controller';
import UserController from '../../controllers/user-controller';

const editUserProfileTmpl = new Templator(editUserProfileTemplate);
const authController = new AuthController();
const userController = new UserController();

type editUserProfileProps = {
  user?: TUser;
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class EditUserProfile extends Block<editUserProfileProps> {
  constructor(props: editUserProfileProps) {
    super('div', {
      ...props,
      handleFocus,
      handleBlur,
      handleSubmit: (e: Event) => {
        const data = handleSubmit(e);
        if (data !== null) {
          userController.changeData(data);
        }
      },
      changeAvatar: (e: Event) => {
        // photo
        userController.changeAvatar({ avatar: '' });
      },
      deleteAvatar: () => {
        userController.changeAvatar({ avatar: '' });
      },
    });
  }

  componentDidMount() {
    console.log('edit-user-mount');
    authController.getUserInfo((user: TProps) => {
      this.setProps({ user });
    });
  }

  render() {
    const button = {
      saveButton: new Button({
        class: 'auth-form__button auth-form__button_center',
        text: 'Сохранить изменения',
        type: 'submit',
      }).textContent,
    };
    const { user } = this.props as editUserProfileProps;
    const context = { ...button, ...user };
    return editUserProfileTmpl.compile(context);
  }
}

export default EditUserProfile;

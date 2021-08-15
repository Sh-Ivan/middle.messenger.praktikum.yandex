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
import escape from '../../helpers/escape';

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
          const escapedData: { [key: string]: string } = {};
          // eslint-disable-next-line array-callback-return
          Object.entries(data).map(([key, value]) => {
            escapedData[key] = escape(value);
          });
          userController.changeData(escapedData);
        }
      },
      changeAvatar: () => {
        const avatar = document.getElementById('avatar') as HTMLInputElement;
        if (avatar && avatar.files && avatar.files.length > 0) {
          const form = new FormData();
          form.append('avatar', avatar.files[0]);
          userController.changeAvatar({ form });
        }
      },
      deleteAvatar: () => {
        const form = new FormData();
        form.append('avatar', '');
        userController.changeAvatar({ form });
      },
    });
  }

  componentDidMount() {
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
    let userAvatar;
    if (user?.avatar) {
      userAvatar = `
        <img src="https://ya-praktikum.tech/api/v2/resources${user.avatar}" class="avatar-wrapper">
      `;
    } else {
      userAvatar = '<i class="avatar-icon"></i>';
    }
    const context = { ...button, ...user, userAvatar };
    return editUserProfileTmpl.compile(context);
  }
}

export default EditUserProfile;

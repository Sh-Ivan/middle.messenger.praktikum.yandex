/* eslint-disable class-methods-use-this */
import Templator from '../../helpers/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';
import Button from '../../components/Button/Button';

const editUserProfileTmpl = new Templator(editUserProfileTemplate);

type editUserProfileProps = {
  user?: TUser;
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

const initialContext = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  displayName: '',
  phone: '',
};

class EditUserProfile extends Block<editUserProfileProps> {
  constructor(props: editUserProfileProps) {
    super('div', props);
  }

  render() {
    const button = {
      saveButton: new Button({
        class: 'auth-form__button auth-form__button_center',
        text: 'Сохранить изменения',
      }).getContent().outerHTML,
    };
    const context = { ...initialContext, ...button };
    return editUserProfileTmpl.compile(context);
  }
}

export default EditUserProfile;

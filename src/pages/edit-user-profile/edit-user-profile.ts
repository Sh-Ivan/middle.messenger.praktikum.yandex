/* eslint-disable class-methods-use-this */
import Templator from '../../helpers/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';

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
    const context = { ...initialContext };
    return editUserProfileTmpl.compile(context);
  }
}

export default EditUserProfile;

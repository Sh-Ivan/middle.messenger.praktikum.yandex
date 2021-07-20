import Templator from '../../../utils/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block from '../../components/block/block';

const editUserProfileTmpl = new Templator(editUserProfileTemplate);

class EditUserProfile extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    const context = {
      email: '',
      login: '',
      firstName: '',
      secondName: '',
      displayName: '',
      phone: '',
    };

    return editUserProfileTmpl.compile(context);
  }
}

// const User = new EditUserProfile();
// User.render();

export default EditUserProfile;

import Templator from '../../../utils/templator';
import editUserProfileTemplate from './edit-user-profile.tmpl';
import Block from '../../components/block/block';

const editUserProfileTmpl = new Templator(editUserProfileTemplate);

class EditUserProfile extends Block {
  constructor(props) {
    super('div', props);
    this.context = {
      email: '',
      login: '',
      firstName: '',
      secondName: '',
      displayName: '',
      phone: '',
    };
  }

  render() {
    console.log(this.con);
    return editUserProfileTmpl.compile(this.context);
  }
}

export default EditUserProfile;

import Templator from '../../helpers/templator';
import userProfileTemplate from './user-profile.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';

const userProfileTmpl = new Templator(userProfileTemplate);

type userProps = {
  user?: TUser;
};

class UserProfile extends Block<userProps> {
  constructor(props: userProps = {}) {
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

    return userProfileTmpl.compile(context);
  }
}

export default UserProfile;

import Templator from '../../../utils/templator';
import userProfileTemplate from './user-profile.tmpl';
import Block from '../../components/block/block';

const userProfileTmpl = new Templator(userProfileTemplate);

class UserProfile extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return userProfileTmpl.compile(this.props);
  }
}

export default UserProfile;

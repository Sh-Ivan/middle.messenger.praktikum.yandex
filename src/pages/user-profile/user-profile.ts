import Templator from '../../helpers/templator';
import userProfileTemplate from './user-profile.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import userController from '../../controllers/user-controller';
import chatController from '../../controllers/chat-controller';

const userProfileTmpl = new Templator(userProfileTemplate);

type userProps = {
  user?: TUser;
};

class UserProfile extends Block<userProps> {
  constructor(props: userProps = {}) {
    super('div', {
      ...props,
      handleSignout: (e: Event) => {
        e.preventDefault();
        userController(null, true);
      },
    });
  }

  componentDidMount() {
    chatController((user: TProps) => {
      this.setProps({ user });
    });
  }

  render() {
    const { user } = this.props as userProps;
    console.log(this.props);
    const context = { ...user };

    return userProfileTmpl.compile(context);
  }
}

export default UserProfile;

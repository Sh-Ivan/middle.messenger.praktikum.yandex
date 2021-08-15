import Templator from '../../helpers/templator';
import userProfileTemplate from './user-profile.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import AuthController from '../../controllers/auth-controller';

const userProfileTmpl = new Templator(userProfileTemplate);
const authController = new AuthController();

type userProps = {
  user?: TUser;
};

class UserProfile extends Block<userProps> {
  constructor(props: userProps = {}) {
    super('div', {
      ...props,
      handleSignout: (e: Event) => {
        e.preventDefault();
        authController.logout();
      },
    });
  }

  componentDidMount() {
    authController.getUserInfo((user: TProps) => {
      this.setProps({ user });
    });
  }

  render() {
    const { user } = this.props as userProps;
    const fullName = user ? `${user?.first_name} ${user?.second_name}` : '';
    let userAvatar;
    if (user?.avatar) {
      userAvatar = `
        <img src="https://ya-praktikum.tech/api/v2/resources${user.avatar}" class="avatar-wrapper">
      `;
    } else {
      userAvatar = '<i class="avatar-icon"></i>';
    }
    const context = { ...user, fullName, userAvatar };

    return userProfileTmpl.compile(context);
  }
}

export default UserProfile;

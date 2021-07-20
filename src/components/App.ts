import '../index.scss';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Page404 from '../pages/404/404';
import Page500 from '../pages/500/500';
import Chat from '../pages/chat/chat';
import UserProfile from '../pages/user-profile/user-profile';
import ChangePassword from '../pages/change-password/change-password';
import EditUserProfile from '../pages/edit-user-profile/edit-user-profile';

const { pathname } = window.location;
const defaultPage = new Chat();

const router = {
  '/': defaultPage,
  '/login': new Login({ testProp: 'test proprety', hide: true }),
  '/signup': new Signup(),
  '/chat': defaultPage,
  '/user': new UserProfile(),
  '/page404': new Page404(),
  '/page500': new Page500(),
  '/change-password': new ChangePassword(),
  '/edit-user-profile': new EditUserProfile(),
};

const App = router[pathname] ? router[pathname] : router['/page404'];

export default App;

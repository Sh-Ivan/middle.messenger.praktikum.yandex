import '../index.scss';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Page404 from '../pages/404/404';
import Page500 from '../pages/500/500';
import Chat from '../pages/chat/chat';
import UserProfile from '../pages/user-profile/user-profile';
import ChangePassword from '../pages/change-password/change-password';
import EditUserProfile from '../pages/edit-user-profile/edit-user-profile';
import ChatPage from './ChatList/chat';
import IBlock from './block/block';
import handleSubmit from '../helpers/formSubmit';
import { handleFocus, handleBlur } from '../helpers/inputValidate';

const { pathname } = window.location;
const defaultPage = new Chat();
const editProfile = new EditUserProfile({ handleSubmit, handleFocus, handleBlur });

type TRoute = { [key: string]: IBlock<unknown> };

const router: TRoute = {
  '/': defaultPage,
  '/login': new Login({ handleSubmit, handleFocus, handleBlur }),
  '/signup': new Signup({ handleSubmit, handleFocus, handleBlur }),
  '/chat': new ChatPage(),
  '/user': new UserProfile(),
  '/page404': new Page404(),
  '/page500': new Page500(),
  '/change-password': new ChangePassword({ handleSubmit, handleFocus, handleBlur }),
  '/edit-user-profile': editProfile,
};

const App = router[pathname] !== undefined ? router[pathname] : router['/page404'];

export default App;

import '../index.scss';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Page404 from '../pages/404/404';
import Page500 from '../pages/500/500';
import UserProfile from '../pages/user-profile/user-profile';
import ChangePassword from '../pages/change-password/change-password';
import EditUserProfile from '../pages/edit-user-profile/edit-user-profile';
import Chat from '../pages/chat/chat';
import Router from '../helpers/Router';

export const AppRouter = new Router('.root');

AppRouter.use('/login', Login)
  .use('/', Chat)
  .use('/login', Login)
  .use('/signup', Signup)
  .use('/page404', Page404)
  .use('/page500', Page500)
  .use('/user', UserProfile)
  .use('/change-password', ChangePassword)
  .use('/edit-user-profile', EditUserProfile, {
    back: AppRouter.back,
  })
  .use('/chat', Chat)
  .use('404', Page404)
  .start();

const App = AppRouter;

export default App;

import UserStore from '../stores/UserStore';
import { EVENTS, State } from '../helpers/store';
import AuthAPI from '../api/auth-api';
import { AppRouter } from '../components/App';

const authAPIInstance = new AuthAPI();

const userController = (cb: any, signout: boolean = false): State => {
  if (signout) {
    localStorage.removeItem('user');

    authAPIInstance.logout().then(() => AppRouter.go('/login'));
  } else {
    UserStore.on(EVENTS.STORE_CHANGED, cb);
  }

  return UserStore.getState();
};

export default userController;

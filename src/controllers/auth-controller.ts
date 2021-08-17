import AuthAPI from '../api/auth-api';
import UserStore from '../stores/UserStore';
import { AppRouter } from '../components/App';
import { EVENTS } from '../helpers/store';

const authAPIInstance = new AuthAPI();

class AuthController {
  signup(data: { [key: string]: string }): void {
    authAPIInstance
      .signup(data)
      .then(() => {
        AppRouter.go('/');
      })
      .catch(console.log);
  }

  getUserInfo<T>(cb: any): Promise<T> {
    return authAPIInstance
      .getUserInfo()
      .then(({ response }) => {
        const user = JSON.parse(response);
        UserStore.on(EVENTS.STORE_CHANGED, cb);
        UserStore.setState(user);
        return user;
      })
      .catch(() => {
        AppRouter.go('/login');
      });
  }

  login(data: { [key: string]: string }) {
    authAPIInstance
      .login(data)
      .then(() => {
        AppRouter.go('/');
      })
      .catch(console.log);
  }

  logout() {
    authAPIInstance
      .logout()
      .then(() => {
        AppRouter.go('/login');
      })
      .catch(console.log);
  }
}

export default AuthController;

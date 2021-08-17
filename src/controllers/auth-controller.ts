import AuthAPI from '../api/auth-api';
import UserStore from '../stores/UserStore';
import { AppRouter } from '../components/App';
import { EVENTS } from '../helpers/store';

const authAPIInstance = new AuthAPI();

class AuthController {
  signup(data: { [key: string]: string }): void {
    authAPIInstance
      .signup(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          AppRouter.go('/');
        }
      })
      .catch(console.log);
  }

  getUserInfo<T>(cb: any): Promise<T> {
    return authAPIInstance.getUserInfo().then((result: XMLHttpRequest) => {
      if (result.status === 200) {
        const user = JSON.parse(result.response);
        UserStore.on(EVENTS.STORE_CHANGED, cb);
        UserStore.setState(user);
        return user;
      }
      AppRouter.go('/login');
    });
  }

  login(data: { [key: string]: string }) {
    authAPIInstance
      .login(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          AppRouter.go('/');
        }
      })
      .catch(console.log);
  }

  logout() {
    authAPIInstance
      .logout()
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          AppRouter.go('/login');
        }
      })
      .catch(console.log);
  }
}

export default AuthController;

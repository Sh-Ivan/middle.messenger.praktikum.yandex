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
        if (result.status === 200) {
          AppRouter.go('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserInfo(cb: any) {
    authAPIInstance.getUserInfo().then((res: XMLHttpRequest) => {
      if (res.status === 200) {
        UserStore.on(EVENTS.STORE_CHANGED, cb);
        UserStore.setState(JSON.parse(res.response));
      } else {
        AppRouter.go('/login');
      }
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
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    authAPIInstance
      .logout()
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          AppRouter.go('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default AuthController;

import AuthAPI from '../api/auth-api';
import UserStore from '../stores/UserStore';
import { AppRouter } from '../components/App';

const authAPIInstance = new AuthAPI();

class AuthController {
  signup(data: { [key: string]: string }): void {
    authAPIInstance.signup(data).then((result: XMLHttpRequest) => {
      console.log(result);
      if (result.status === 200) {
      }
    });
  }

  getUserInfo() {
    return authAPIInstance.get('user', {});
  }

  login(data: any) {
    return authAPIInstance.post('signin', { data });
  }

  logout() {
    return authAPIInstance.post('logout', {});
  }
}

const signupController = (data: { [key: string]: string }): void => {
  authAPIInstance.create(data).then((result) => console.log(result));
};

export default AuthController;

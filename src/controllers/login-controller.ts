import AuthAPI from '../api/auth-api';
import UserStore from '../stores/UserStore';
import { AppRouter } from '../components/App';

const authAPIInstance = new AuthAPI();

const loginController = (data: { [key: string]: string }): void => {
  authAPIInstance
    .login(data)
    .then(() => authAPIInstance.request())
    .then((result: XMLHttpRequest) => {
      localStorage.setItem('user', result.response);
      AppRouter.go('/');
      UserStore.setState(result.response);
    });
};

export default loginController;

import HTTP from '../helpers/http';
import baseURL from './basURL';

const authAPIInstance = new HTTP(`${baseURL}/auth/`);

export default class AuthAPI {
  signup(data: any) {
    return authAPIInstance.post('signup', { data });
  }

  getUserInfo() {
    return authAPIInstance.get('user');
  }

  login(data: any) {
    return authAPIInstance.post('signin', { data });
  }

  logout() {
    return authAPIInstance.post('logout');
  }
}

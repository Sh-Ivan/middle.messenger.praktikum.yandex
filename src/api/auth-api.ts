import HTTP from '../helpers/http';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth/');

export default class AuthAPI {
  signup(data: any) {
    return authAPIInstance.post('signup', { data });
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

import HTTP from '../helpers/http';
import baseURL from './basURL';

const userAPIInstance = new HTTP(`${baseURL}/user/`);

export default class UserAPI {
  changeData(data: any) {
    return userAPIInstance.put('profile/', { data });
  }

  changeAvatar(data: any) {
    return userAPIInstance.put('profile/avatar', {
      data,
    });
  }

  changePassword(data: any) {
    return userAPIInstance.put('password/', { data });
  }

  getUser(id: number) {
    return userAPIInstance.get(`${id}`);
  }

  searchUser(login: string) {
    return userAPIInstance.post('search', { data: { login } });
  }
}

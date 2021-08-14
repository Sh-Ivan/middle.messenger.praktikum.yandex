import HTTP from '../helpers/http';

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user/');

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
    return userAPIInstance.get(`${id}`, {});
  }

  searchUser(login: string) {
    return userAPIInstance.post('search', { data: { login } });
  }
}

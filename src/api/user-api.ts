import HTTP from '../helpers/http';

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user/');

export default class UserAPI {
  changeData(data: any) {
    return userAPIInstance.put('profile/', { data });
  }

  changeAvatar(data: any) {
    return userAPIInstance.put('profile/avatar', { data });
  }

  /*
  {
  "oldPassword": "string",
  "newPassword": "string"
  }
  */
  changePassword(data: any) {
    return userAPIInstance.put('password/', { data });
  }
}

import UserAPI from '../api/user-api';
import UserStore from '../stores/UserStore';
import ListUsers from '../stores/ListUsers';
import { EVENTS } from '../helpers/store';

const userAPIInstance = new UserAPI();

class UserController {
  changeData<T>(data: { [key: string]: string }): Promise<T> {
    return userAPIInstance
      .changeData(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        const newData = JSON.parse(result.response);
        if (result.status === 200) {
          UserStore.setState(newData);
        }
        return newData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeAvatar(data: { [key: string]: string }): void {
    userAPIInstance
      .changeAvatar(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changePassword(data: { [key: string]: string }): void {
    userAPIInstance
      .changePassword(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser<T>(id: number): Promise<T> {
    return userAPIInstance
      .getUser(id)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        return JSON.parse(result.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchUser<T>(login: string): Promise<T> {
    return userAPIInstance
      .searchUser(login)
      .then((result: XMLHttpRequest) => {
        const listUsers = JSON.parse(result.response);
        ListUsers.setState(listUsers);
        return listUsers;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  subscribeToListUsersStoreEvent(cb: any) {
    ListUsers.on(EVENTS.STORE_CHANGED, cb);
  }
}

export default UserController;

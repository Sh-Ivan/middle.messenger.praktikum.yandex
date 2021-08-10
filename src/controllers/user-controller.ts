import UserAPI from '../api/user-api';
import UserStore from '../stores/UserStore';
import ListUsers from '../stores/ListUsers';
import { EVENTS } from '../helpers/store';

const userAPIInstance = new UserAPI();

class UserController {
  changeData(data: { [key: string]: string }): void {
    userAPIInstance
      .changeData(data)
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

  getUser(id: number): void {
    userAPIInstance
      .getUser(id)
      .then((result: XMLHttpRequest) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchUser(login: string): void {
    userAPIInstance
      .searchUser(login)
      .then((result: XMLHttpRequest) => {
        ListUsers.setState(JSON.parse(result.response));
        console.log(result);
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

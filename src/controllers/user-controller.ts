import UserAPI from '../api/user-api';
import UserStore from '../stores/UserStore';
import ListUsers from '../stores/ListUsers';
import { EVENTS } from '../helpers/store';

const userAPIInstance = new UserAPI();

class UserController {
  changeData<T>(data: { [key: string]: string }): Promise<T> {
    return userAPIInstance
      .changeData(data)
      .then(({ response }) => {
        const newData = JSON.parse(response);
        UserStore.setState(newData);
        return newData;
      })
      .catch(console.log);
  }

  changeAvatar(data: { form: FormData }): void {
    userAPIInstance
      .changeAvatar(data)
      .then(({ response }) => {
        UserStore.setState(JSON.parse(response));
      })
      .catch(console.log);
  }

  changePassword(data: { [key: string]: string }): void {
    userAPIInstance
      .changePassword(data)
      .then(() => {})
      .catch(console.log);
  }

  getUser<T>(id: number): Promise<T> {
    return userAPIInstance
      .getUser(id)
      .then(({ response }) => JSON.parse(response))
      .catch(console.log);
  }

  searchUser<T>(login: string): Promise<T> {
    return userAPIInstance
      .searchUser(login)
      .then(({ response }) => {
        const listUsers = JSON.parse(response);
        ListUsers.setState(listUsers);
        return listUsers;
      })
      .catch(console.log);
  }

  subscribeToListUsersStoreEvent(cb: any) {
    ListUsers.on(EVENTS.STORE_CHANGED, cb);
  }
}

export default UserController;

import UserAPI from '../api/user-api';
import UserStore from '../stores/UserStore';
import { AppRouter } from '../components/App';
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
}

export default UserController;

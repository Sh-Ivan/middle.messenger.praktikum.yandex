import UserStore from '../stores/UserStore';
import { EVENTS, State } from '../helpers/store';
import AuthAPI from '../api/auth-api';

const editUserController = (data: { [key: string]: string }) => {
  authAPIInstance.request().then((res: XMLHttpRequest) => {
    console.log(res);
    UserStore.on(EVENTS.STORE_CHANGED, cb);
    UserStore.setState(JSON.parse(res.response));
  });
  UserStore.setState(JSON.stringify(data.response));
};

export default editUserController;

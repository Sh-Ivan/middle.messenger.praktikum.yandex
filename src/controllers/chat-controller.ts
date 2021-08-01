import AuthAPI from '../api/auth-api';
import UserStore from '../stores/UserStore';
import { EVENTS } from '../helpers/store';

const authAPIInstance = new AuthAPI();

const chatController = (cb: any): void => {
  authAPIInstance.request().then((res: XMLHttpRequest) => {
    console.log(res);
    UserStore.on(EVENTS.STORE_CHANGED, cb);
    UserStore.setState(JSON.parse(res.response));
  });
};

export default chatController;

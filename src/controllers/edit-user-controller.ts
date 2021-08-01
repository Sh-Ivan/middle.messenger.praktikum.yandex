import UserStore from '../stores/UserStore';
import { EVENTS, State } from '../helpers/store';
import AuthAPI from '../api/auth-api';

const editUserController = (data: { [key: string]: string }) => {
  UserStore.setState(JSON.stringify(data.response));
};

export default editUserController;

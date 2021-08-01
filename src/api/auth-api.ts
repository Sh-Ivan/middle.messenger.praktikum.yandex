/* eslint-disable camelcase */
import BaseAPI from './base-api';
import HTTP from '../helpers/http';

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
};

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth/');

export default class AuthAPI extends BaseAPI {
  create(data: any) {
    return authAPIInstance.post('signup/', { data });
  }

  request() {
    return authAPIInstance.get('user/', {});
  }

  login(data: any) {
    return authAPIInstance.post('signin/', { data });
  }

  logout() {
    return authAPIInstance.post('logout/', {});
  }
}

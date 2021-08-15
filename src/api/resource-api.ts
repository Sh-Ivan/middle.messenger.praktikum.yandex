import HTTP from '../helpers/http';

const resourceAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/resources/');

export default class resorceAPI {
  sendFile(data: any) {
    return resourceAPIInstance.post('', { data });
  }
}

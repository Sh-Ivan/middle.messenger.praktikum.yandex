import HTTP from '../helpers/http';
import baseURL from './basURL';

const resourceAPIInstance = new HTTP(`${baseURL}/resources/`);

export default class resorceAPI {
  sendFile(data: any) {
    return resourceAPIInstance.post('', { data });
  }
}

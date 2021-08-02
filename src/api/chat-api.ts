import HTTP from '../helpers/http';

const chatAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats/');

export default class ChatAPI {
  chats() {
    return chatAPIInstance.get('', {});
  }

  createChat(data: any) {
    return chatAPIInstance.post('', { data });
  }

  addUsers(data: any) {
    return chatAPIInstance.put('users', { data });
  }

  deleteUsers(data: any) {
    return chatAPIInstance.delete('users', { data });
  }
}

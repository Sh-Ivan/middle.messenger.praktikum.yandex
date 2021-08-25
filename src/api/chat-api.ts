import HTTP from '../helpers/http';
import baseURL from './basURL';

const chatAPIInstance = new HTTP(`${baseURL}/chats/`);

export default class ChatAPI {
  getChats() {
    return chatAPIInstance.get('');
  }

  createChat(data: any) {
    return chatAPIInstance.post('', { data });
  }

  deleteChat(data: any) {
    return chatAPIInstance.delete('', { data });
  }

  getToken(chatId: number) {
    return chatAPIInstance.post(`token/${chatId}`);
  }

  addUsers(data: any) {
    return chatAPIInstance.put('users', { data });
  }

  getChatUsers(data: any) {
    return chatAPIInstance.get(`${data.id}/users`);
  }

  deleteUsers(data: any) {
    return chatAPIInstance.delete('users', { data });
  }
}

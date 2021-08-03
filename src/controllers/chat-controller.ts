import ChatAPI from '../api/chat-api';
import UserStore from '../stores/UserStore';

const chatAPIInstance = new ChatAPI();

class ChatController {
  getChats(): void {
    chatAPIInstance
      .getChats()
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // { "title": "string" }
  createChat(data: { [key: string]: string }): void {
    chatAPIInstance
      .createChat(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* {
      "users": [
        0
      ],
      "chatId": 0
    }
  */
  addUsers(data: { [key: string]: string }): void {
    chatAPIInstance
      .addUsers(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUsers(data: { [key: string]: string }): void {
    chatAPIInstance
      .addUsers(data)
      .then((result: XMLHttpRequest) => {
        console.log(result);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default ChatController;

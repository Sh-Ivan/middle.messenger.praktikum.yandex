import ChatAPI from '../api/chat-api';
import UserStore from '../stores/UserStore';

const chatAPIInstance = new ChatAPI();

class ChatController {
  getChats(): void {
    chatAPIInstance
      .getChats()
      .then((result: XMLHttpRequest) => {
        console.log(result.response);
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
        console.log(result.response);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getToken(data: { [key: string]: string }): void {
    chatAPIInstance
      .getToken(data)
      .then((result: XMLHttpRequest) => {
        console.log(result.response);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
  { "chatId": 0 }
  */

  deleteChat(data: { [key: string]: number }): void {
    chatAPIInstance
      .deleteChat(data)
      .then((result: XMLHttpRequest) => {
        console.log(result.response);
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
  addUsers(data: { [key: string]: unknown }): void {
    chatAPIInstance
      .addUsers(data)
      .then((result: XMLHttpRequest) => {
        console.log(result.response);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getChatUsers(data: { [key: string]: unknown }): void {
    chatAPIInstance
      .getChatUsers(data)
      .then((result: XMLHttpRequest) => {
        console.log(result.response);
        if (result.status === 200) {
          //UserStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUsers(data: { [key: string]: any }): void {
    chatAPIInstance
      .addUsers(data)
      .then((result: XMLHttpRequest) => {
        console.log(result.response);
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

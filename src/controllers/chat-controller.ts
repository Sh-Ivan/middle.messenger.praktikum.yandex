import ChatAPI from '../api/chat-api';
import ChatStore from '../stores/ChatStore';
import TChat from '../helpers/TChat';
import { EVENTS } from '../helpers/store';
import ChatSocketController from './chat-socket-controller';

const chatAPIInstance = new ChatAPI();

class ChatController {
  getChats(): void {
    chatAPIInstance
      .getChats()
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          ChatStore.setState(JSON.parse(result.response));
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
        if (result.status === 200) {
          //ChatStore.setState(JSON.parse(result.response));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getToken(data: { [chatId: string]: number }): void {
    chatAPIInstance
      .getToken(data.chatId)
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          const token = JSON.parse(result.response)?.token;
          const chatSocketController = new ChatSocketController(data.userId, data.chatId, token);
          const state = ChatStore.getState() as TChat[];
          const chatIndex = state.findIndex((chat) => chat.id === data.chatId);
          if (chatIndex === -1) {
            state.push({
              id: data.chatId,
              token,
              users: [],
              messages: [],
              controller: chatSocketController,
            });
          } else {
            state[chatIndex].token = token;
            state[chatIndex].controller = chatSocketController;
          }
          ChatStore.setState(state);
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
          //ChatStore.setState(JSON.parse(result.response));
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

  subscribeToChatStoreEvent(cb: any) {
    ChatStore.on(EVENTS.STORE_CHANGED, cb);
  }
}

export default ChatController;

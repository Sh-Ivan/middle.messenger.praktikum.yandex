import ChatAPI from '../api/chat-api';
import ChatStore from '../stores/ChatStore';
import TChat from '../helpers/TChat';
import { EVENTS } from '../helpers/store';
import ChatSocketController from './chat-socket-controller';

const chatAPIInstance = new ChatAPI();

class ChatController {
  getChats<T>(userId: number): Promise<T> {
    return chatAPIInstance
      .getChats()
      .then((result: XMLHttpRequest) => {
        const chats = JSON.parse(result.response);
        if (result.status === 200) {
          console.log(chats);
          ChatStore.setState(chats);
          if (chats.length > 0) {
            this.getToken({ chatId: chats[0].id, userId });
          }
        }
        return chats;
      })
      .catch(console.log);
  }

  createChat(data: { [key: string]: string }, userId: number): void {
    chatAPIInstance
      .createChat(data)
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          this.getChats(userId);
        }
      })
      .catch(console.log);
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
      .catch(console.log);
  }

  deleteChat(data: { [key: string]: number }, userId: number): void {
    chatAPIInstance
      .deleteChat(data)
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          this.getChats(userId);
        }
      })
      .catch(console.log);
  }

  addUsers(data: { [key: string]: any }): void {
    chatAPIInstance
      .addUsers(data)
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          this.getChatUsers({ id: +data.chatId });
        }
      })
      .catch(console.log);
  }

  getChatUsers<T>(data: { [key: string]: unknown }): Promise<T> {
    return chatAPIInstance
      .getChatUsers(data)
      .then((result: XMLHttpRequest) => {
        const chatUsers = JSON.parse(result.response);
        console.log(chatUsers);
        return chatUsers;
      })
      .catch(console.log);
  }

  deleteUsers(data: { [key: string]: any }): void {
    chatAPIInstance
      .deleteUsers(data)
      .then((result: XMLHttpRequest) => {
        if (result.status === 200) {
          this.getChatUsers({ id: +data.chatId });
        }
      })
      .catch(console.log);
  }

  subscribeToChatStoreEvent(cb: any) {
    ChatStore.on(EVENTS.STORE_CHANGED, cb);
  }
}

export default ChatController;

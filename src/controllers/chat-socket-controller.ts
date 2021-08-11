import ChatStore from '../stores/ChatStore';

const socketHost = 'wss://ya-praktikum.tech/ws/chats/';

class ChatSocketController {
  socket: WebSocket;
  _chatId: number;

  constructor(userId: number, chatId: number, token: string) {
    this._chatId = chatId;
    this.socket = new WebSocket(`${socketHost}${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      console.log('Socket connection open');
      this.getMessages();
    });

    this.socket.addEventListener('message', (event) => {
      const state = ChatStore.getState();
      const messages = JSON.parse(event.data);
      const chatIndex = state.findIndex((chat: any) => chat.id === this._chatId);
      if (chatIndex !== -1) {
        if (Array.isArray(messages)) {
          state[chatIndex].messages = messages;
        } else {
          state[chatIndex].messages.unshift(messages);
        }
      }
      ChatStore.setState(state);
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Socket connection closed clearly');
      } else {
        console.log('Connection interrupped!');
      }
      console.log(`Code: ${event.code} | Reason: ${event.reason}`);
    });

    this.socket.addEventListener('error', (event) => {
      console.log(`Error: ${event}`);
    });
  }

  sendMessage(message: string): void {
    //console.log(message);
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  getMessages(from: number = 0): void {
    this.socket.send(
      JSON.stringify({
        content: from,
        type: 'get old',
      }),
    );
  }
}

export default ChatSocketController;

const socketHost = 'wss://ya-praktikum.tech/ws/chats/';

class ChatSocketController {
  socket: WebSocket;

  constructor(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(`${socketHost}${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      console.log('Socket connection open');
    });

    this.socket.addEventListener('message', (event) => {
      console.log(`Message: ${event.data}`);
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
    this.socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }
}

export default ChatSocketController;

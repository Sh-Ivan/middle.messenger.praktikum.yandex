"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatStore_1 = require("../stores/ChatStore");
const socketHost = 'wss://ya-praktikum.tech/ws/chats/';
class ChatSocketController {
    constructor(userId, chatId, token) {
        this._chatId = chatId;
        this.socket = new WebSocket(`${socketHost}${userId}/${chatId}/${token}`);
        this.socket.addEventListener('open', () => {
            this.getMessages();
            this.intervalId = setInterval(() => this.sendMessage('', 'ping'), 20000);
        });
        this.socket.addEventListener('message', (event) => {
            const state = ChatStore_1.default.getState();
            const messages = JSON.parse(event.data);
            if (messages.type === 'pong')
                return;
            const chatIndex = state.findIndex((chat) => chat.id === this._chatId);
            if (chatIndex !== -1) {
                if (Array.isArray(messages)) {
                    state[chatIndex].messages = messages;
                }
                else if (messages.type === 'message' || messages.type === 'file') {
                    state[chatIndex].messages.unshift(messages);
                }
            }
            ChatStore_1.default.setState(state);
        });
        this.socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('Socket connection closed clearly');
            }
            else {
                console.log('Connection interrupped!');
            }
            console.log(`Code: ${event.code} | Reason: ${event.reason}`);
            clearInterval(this.intervalId);
        });
        this.socket.addEventListener('error', (event) => {
            console.log(`Error: ${event}`);
        });
    }
    sendMessage(message, type = 'message') {
        this.socket.send(JSON.stringify({
            content: message,
            type,
        }));
    }
    getMessages(from = 0) {
        this.socket.send(JSON.stringify({
            content: from,
            type: 'get old',
        }));
    }
}
exports.default = ChatSocketController;
//# sourceMappingURL=chat-socket-controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_api_1 = require("../api/chat-api");
const ChatStore_1 = require("../stores/ChatStore");
const store_1 = require("../helpers/store");
const chat_socket_controller_1 = require("./chat-socket-controller");
const chatAPIInstance = new chat_api_1.default();
class ChatController {
    getChats(userId) {
        return chatAPIInstance
            .getChats()
            .then((result) => {
            const chats = JSON.parse(result.response);
            if (result.status === 200) {
                console.log(chats);
                ChatStore_1.default.setState(chats);
                if (chats.length > 0) {
                    this.getToken({ chatId: chats[0].id, userId });
                }
            }
            return chats;
        })
            .catch((error) => {
            console.log(error);
        });
    }
    createChat(data, userId) {
        chatAPIInstance
            .createChat(data)
            .then((result) => {
            if (result.status === 200) {
                this.getChats(userId);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    getToken(data) {
        chatAPIInstance
            .getToken(data.chatId)
            .then((result) => {
            var _a;
            if (result.status === 200) {
                const token = (_a = JSON.parse(result.response)) === null || _a === void 0 ? void 0 : _a.token;
                const chatSocketController = new chat_socket_controller_1.default(data.userId, data.chatId, token);
                const state = ChatStore_1.default.getState();
                const chatIndex = state.findIndex((chat) => chat.id === data.chatId);
                if (chatIndex === -1) {
                    state.push({
                        id: data.chatId,
                        token,
                        users: [],
                        messages: [],
                        controller: chatSocketController,
                    });
                }
                else {
                    state[chatIndex].token = token;
                    state[chatIndex].controller = chatSocketController;
                }
                ChatStore_1.default.setState(state);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    deleteChat(data, userId) {
        chatAPIInstance
            .deleteChat(data)
            .then((result) => {
            if (result.status === 200) {
                this.getChats(userId);
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    addUsers(data) {
        chatAPIInstance
            .addUsers(data)
            .then((result) => {
            if (result.status === 200) {
                this.getChatUsers({ id: +data.chatId });
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    getChatUsers(data) {
        return chatAPIInstance
            .getChatUsers(data)
            .then((result) => {
            const chatUsers = JSON.parse(result.response);
            console.log(chatUsers);
            return chatUsers;
        })
            .catch((error) => {
            console.log(error);
        });
    }
    deleteUsers(data) {
        chatAPIInstance
            .deleteUsers(data)
            .then((result) => {
            if (result.status === 200) {
                this.getChatUsers({ id: +data.chatId });
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
    subscribeToChatStoreEvent(cb) {
        ChatStore_1.default.on(store_1.EVENTS.STORE_CHANGED, cb);
    }
}
exports.default = ChatController;
//# sourceMappingURL=chat-controller.js.map
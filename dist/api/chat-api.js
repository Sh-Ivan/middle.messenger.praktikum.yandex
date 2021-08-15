"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../helpers/http");
const chatAPIInstance = new http_1.default('https://ya-praktikum.tech/api/v2/chats/');
class ChatAPI {
    getChats() {
        return chatAPIInstance.get('', {});
    }
    createChat(data) {
        return chatAPIInstance.post('', { data });
    }
    deleteChat(data) {
        return chatAPIInstance.delete('', { data });
    }
    getToken(chatId) {
        return chatAPIInstance.post(`token/${chatId}`, {});
    }
    addUsers(data) {
        return chatAPIInstance.put('users', { data });
    }
    getChatUsers(data) {
        return chatAPIInstance.get(`${data.id}/users`, {});
    }
    deleteUsers(data) {
        return chatAPIInstance.delete('users', { data });
    }
}
exports.default = ChatAPI;
//# sourceMappingURL=chat-api.js.map
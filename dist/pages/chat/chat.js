"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-alert */
const templator_1 = require("../../helpers/templator");
require("./chat-list.scss");
const chat_tmpl_1 = require("./chat.tmpl");
const block_1 = require("../../components/block/block");
const auth_controller_1 = require("../../controllers/auth-controller");
const chat_controller_1 = require("../../controllers/chat-controller");
const user_controller_1 = require("../../controllers/user-controller");
const resource_controller_1 = require("../../controllers/resource-controller");
const sortUtils_1 = require("../../helpers/sortUtils");
const compareDate_1 = require("../../helpers/compareDate");
const escape_1 = require("../../helpers/escape");
const chatTmpl = new templator_1.default(chat_tmpl_1.default);
const authController = new auth_controller_1.default();
const chatController = new chat_controller_1.default();
const userController = new user_controller_1.default();
const resourceController = new resource_controller_1.default();
const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';
class Chat extends block_1.default {
    constructor(props = {}) {
        super('div', Object.assign(Object.assign({}, props), { createChat: () => {
                const { user } = this.props;
                if (user) {
                    chatController.createChat({ title: 'Test chat' }, user.id);
                }
            }, deleteChat: () => {
                const answer = confirm('Удалить чат?');
                if (answer) {
                    const { activeChat, user } = this.props;
                    if (activeChat && user) {
                        chatController.deleteChat({ chatId: activeChat.id }, user.id);
                    }
                }
            }, addUsers: () => {
                const userLogin = prompt('Введите логин пользователя');
                console.log(userLogin);
                if (userLogin) {
                    userController.searchUser(userLogin).then((listUsers) => {
                        console.log(listUsers);
                        const user = listUsers.find((user) => user.login === userLogin);
                        console.log(user);
                        const { activeChat } = this.props;
                        console.log(activeChat);
                        if (user && activeChat) {
                            chatController.addUsers({
                                users: [user.id],
                                chatId: activeChat.id,
                            });
                        }
                        else {
                            console.log(`User ${userLogin} not found!`);
                        }
                    });
                }
            }, deleteUsers: () => {
                const userLogin = prompt('Введите логин пользователя');
                console.log(userLogin);
                if (userLogin) {
                    userController.searchUser(userLogin).then((listUsers) => {
                        console.log(listUsers);
                        const user = listUsers.find((user) => user.login === userLogin);
                        console.log(user);
                        const { activeChat } = this.props;
                        console.log(activeChat);
                        if (user && activeChat) {
                            chatController.deleteUsers({
                                users: [user.id],
                                chatId: activeChat.id,
                            });
                        }
                        else {
                            console.log(`User ${userLogin} not found!`);
                        }
                    });
                }
            }, toggleMenu: () => {
                const menu = document.querySelector('.chat-header__menu');
                menu === null || menu === void 0 ? void 0 : menu.classList.toggle('hide');
            }, toggleMainMenu: () => {
                const menu = document.querySelector('.chat-list__menu');
                menu === null || menu === void 0 ? void 0 : menu.classList.toggle('hide');
            }, hideMenu: (event) => {
                const chatListMenu = document.querySelector('.chat-list__menu');
                const chatHeaderMenu = document.querySelector('.chat-header__menu');
                if (event.target !== chatListMenu) {
                    chatListMenu === null || chatListMenu === void 0 ? void 0 : chatListMenu.classList.add('hide');
                }
                if (event.target !== chatHeaderMenu) {
                    chatHeaderMenu === null || chatHeaderMenu === void 0 ? void 0 : chatHeaderMenu.classList.add('hide');
                }
            }, connectToChat: (event) => {
                const { id: userId } = this.props.user;
                const target = event.currentTarget;
                let chatId = target.dataset.id;
                if (chatId !== undefined) {
                    chatId = +chatId;
                    chatController.getToken({
                        userId,
                        chatId,
                    });
                }
                const { chats } = this.props;
                const chat = chats === null || chats === void 0 ? void 0 : chats.find((chat) => chat.id === chatId);
                this.setProps({ activeChat: chat });
            }, sendMessage: (event) => {
                var _a;
                event.preventDefault();
                const target = event.target;
                const message = (_a = target.message) === null || _a === void 0 ? void 0 : _a.value;
                const escapedMessage = escape_1.default(message);
                const chat = this.props.activeChat;
                if (chat) {
                    chat.controller.sendMessage(escapedMessage);
                }
            }, sendFile: (event) => {
                const image = event.target;
                if (image && image.files && image.files.length > 0) {
                    const form = new FormData();
                    form.append('resource', image.files[0]);
                    resourceController.sendFile({ form }).then((result) => {
                        const chat = this.props.activeChat;
                        if (chat) {
                            chat.controller.sendMessage(result === null || result === void 0 ? void 0 : result.id, 'file');
                        }
                    });
                }
            }, logout: () => {
                authController.logout();
            } }));
    }
    componentDidMount() {
        authController.getUserInfo((user) => {
            this.setProps({ user });
            chatController.getChats(user.id).then((chats) => {
                if (chats) {
                    this.setProps({ activeChat: chats[0] });
                }
            });
        });
        chatController.subscribeToChatStoreEvent((chats) => {
            this.setProps({ chats });
        });
        userController.subscribeToListUsersStoreEvent((listUsers) => {
            this.setProps({ listUsers });
        });
    }
    componentDidUpdate(props) {
        var _a;
        if (props && props.chats && props.chats.length > 0) {
            if (((_a = props.chats) === null || _a === void 0 ? void 0 : _a.findIndex((chat) => { var _a; return chat.id === ((_a = props.activeChat) === null || _a === void 0 ? void 0 : _a.id); })) === -1) {
                this.setProps({ activeChat: props.chats[0] });
            }
        }
        const messageList = document.querySelector('section.chat-main');
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
        return true;
    }
    render() {
        // eslint-disable-next-line object-curly-newline
        const { user, chats, activeChat, listUsers } = this.props;
        const messages = activeChat === null || activeChat === void 0 ? void 0 : activeChat.messages;
        const chatsLayout = chats === null || chats === void 0 ? void 0 : chats.map((chat) => {
            var _a, _b;
            let time = '';
            if (chat.last_message) {
                const dateTime = new Date((_a = chat.last_message) === null || _a === void 0 ? void 0 : _a.time);
                time = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
            }
            let classList = 'chat-list__item';
            if (chat.id === (activeChat === null || activeChat === void 0 ? void 0 : activeChat.id)) {
                classList += ' chat-active';
            }
            return `<li class="${classList}" on:click={{connectToChat}} data-id=${chat.id}>
      <div class="chat-list-item__avatar">
      </div>
      <div class="chat-list-item__rows">
        <div class="chat-list-item__row">
          <div class="chat-list-item__name">
            ${chat.title}
          </div>
          <div class="chat-list-item__time">
            ${time}
          </div>
        </div>
        <div class="chat-list-item__row">
          <div class="chat-list-item__message">
           ${escape_1.default(((_b = chat.last_message) === null || _b === void 0 ? void 0 : _b.content) || '')}
          </div>
          <div class="chat-list-item__badge">
            ${chat.unread_count}
          </div>
        </div>
      </div>
    </li>`;
        });
        let prevDate;
        let messagesLayout;
        messagesLayout = messages === null || messages === void 0 ? void 0 : messages.sort(sortUtils_1.default).map((message) => {
            var _a;
            let dateSeparator;
            const dateTime = new Date(message.time);
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            if (prevDate && compareDate_1.isEqualDate(dateTime, prevDate)) {
                dateSeparator = '';
            }
            else if (!compareDate_1.isToday(dateTime)) {
                dateSeparator = `<div class="chat-main__date">${dateTime.toLocaleString('ru-Ru', options)}</div>`;
            }
            else {
                dateSeparator = '<div class="chat-main__date">Сегодня</div>';
            }
            prevDate = dateTime;
            const time = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
            let classes = 'chat-main__message';
            if (+message.user_id === (user === null || user === void 0 ? void 0 : user.id)) {
                classes += ' chat-main__message_left';
            }
            else {
                classes += ' chat-main__message_right';
            }
            let messageLayout;
            if (message.type === 'file') {
                messageLayout = `<div class="${classes}">
          <img src="${RESOURCES_URL}${(_a = message === null || message === void 0 ? void 0 : message.file) === null || _a === void 0 ? void 0 : _a.path}" alt="image" 
          class="chat-main__message-image"/>
          <span class="message-date">${time}</span>
        </div>`;
            }
            else {
                messageLayout = `
        <div class="${classes}">
          ${escape_1.default(message.content)}
          <span class="message-date">${time}</span>
        </div>`;
            }
            return `
      ${dateSeparator} ${messageLayout}`;
        });
        if ((messagesLayout === null || messagesLayout === void 0 ? void 0 : messagesLayout.length) === 0) {
            messagesLayout = '<div class="chat-main__no-message">Отправьте первое сообщение</div>';
        }
        let findUsers = null;
        if (listUsers && listUsers.length > 0) {
            findUsers = ['<ul class="list-search__users">'];
            const listUsersLayout = listUsers === null || listUsers === void 0 ? void 0 : listUsers.map((user) => {
                const userLogin = `${user.login}`;
                const userName = `${user.first_name} ${user.second_name}`;
                return `<li class="list-search__item" on:click={{createChat}} 
          data-user=${user.id}>${userLogin}: ${userName}}</li>`;
            });
            findUsers.push(...listUsersLayout);
            findUsers.push('</ul>');
        }
        const activeChatTitle = (activeChat === null || activeChat === void 0 ? void 0 : activeChat.title) || null;
        let userAvatar;
        if (user === null || user === void 0 ? void 0 : user.avatar) {
            userAvatar = `
        <img src="${RESOURCES_URL}${user.avatar}" class="chat-list-search__avatar">
      `;
        }
        else {
            userAvatar = null;
        }
        const context = Object.assign(Object.assign({}, user), { chats,
            chatsLayout,
            messagesLayout,
            findUsers,
            activeChatTitle,
            userAvatar });
        return chatTmpl.compile(context);
    }
}
exports.default = Chat;
//# sourceMappingURL=chat.js.map
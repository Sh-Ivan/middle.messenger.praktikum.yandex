import Templator from '../../helpers/templator';
import './chat-list.scss';
import chatTemplate from './chat.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import TChat from '../helpers/TChat';
import AuthController from '../../controllers/auth-controller';
import ChatController from '../../controllers/chat-controller';
import UserController from '../../controllers/user-controller';
import ResourceController from '../../controllers/resource-controller';
import { byTime } from '../../helpers/sortUtils';
import { isToday, isEqualDate } from '../../helpers/compareDate';
import escape from '../../helpers/escape';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();
const chatController = new ChatController();
const userController = new UserController();
const resourceController = new ResourceController();

interface TChatProps {
  user: TUser;
  chats?: TChat[];
  messages?: any;
  [key: string]: unknown;
}

class Chat extends Block<TChatProps> {
  constructor(props: any = {}) {
    super('div', {
      ...props,

      createChat: (event) => {
        const answer = confirm(`Начать чат?`);
        if (answer) {
          const id = event.target.dataset.user;
          const user = this.props.listUsers.find((user) => user.id === +id);
          if (user) {
            chatController.createChat({
              title: `${user.first_name} ${user.second_name}`,
            });
          }
        }
      },

      deleteChat: () => {
        chatController.deleteChat({ chatId: 243 });
      },

      addUsers: () => {
        const userLogin = prompt('Введите логин пользователя');
        userController.searchUser(userLogin).then((result) => {
          const user = this.props.listUsers.find((user) => user.login === userLogin);
          if (user) {
            chatController.addUsers({
              users: [user.id],
              chatId: this.props.activeChat.id,
            });
          } else {
            console.log(`User ${user.login} not found!`);
          }
        });
      },

      getChatUsers: () => {
        chatController.getChatUsers({
          id: 243,
        });
      },

      deleteUsers: () => {
        chatController.deleteUsers({
          users: [93096],
          chatId: 243,
        });
      },

      handleSearchUser: (event: Event) => {
        event.preventDefault();
        const escapedSearch = escape(event.target.value);
        userController.searchUser(escapedSearch);
      },

      toggleMenu: () => {
        const menu = document.querySelector('.chat-header__menu');
        menu?.classList.toggle('hide');
      },

      toggleMainMenu: () => {
        const menu = document.querySelector('.chat-list__menu');
        menu?.classList.toggle('hide');
      },

      hideMenu: (event) => {
        const chatListMenu = document.querySelector('.chat-list__menu');
        const chatHeaderMenu = document.querySelector('.chat-header__menu');
        if (event.target !== chatListMenu) {
          chatListMenu?.classList.add('hide');
        }
        if (event.target !== chatHeaderMenu) {
          chatHeaderMenu?.classList.add('hide');
        }
      },

      connectToChat: (event: Event) => {
        const { id: userId } = this.props.user as TProps;
        const target = event.currentTarget as HTMLElement;
        let chatId: any = target.dataset.id;
        if (chatId !== undefined) {
          chatId = +chatId;
        }
        chatController.getToken({
          userId,
          chatId,
        });
        const { chats } = this.props as TChatProps;
        const chat = chats?.find((chat) => chat.id === chatId);
        this.setProps({ activeChat: chat });
      },

      sendMessage: (event: Event) => {
        event.preventDefault();
        const message = event.target.message.value;
        const escapedMessage = escape(message);
        const chat = this.props.activeChat;
        if (chat) {
          chat.controller.sendMessage(escapedMessage);
        }
      },

      sendFile: (event: Event) => {
        const image = event.target;
        if (image?.files.length > 0) {
          const form = new FormData();
          form.append('resource', image.files[0]);
          resourceController.sendFile({ form }).then((result) => {
            const chat = this.props.activeChat;
            if (chat) {
              chat.controller.sendMessage(result.id, 'file');
            }
          });
        }
      },

      logout: () => {
        authController.logout();
      },
    });
  }

  componentDidMount() {
    authController.getUserInfo((user: TProps) => {
      this.setProps({ user });
      chatController.getChats(user.id).then((chats) => {
        if (chats) {
          this.setProps({ activeChat: chats[0] });
        }
      });
    });
    chatController.subscribeToChatStoreEvent((chats: TChat) => {
      this.setProps({ chats });
    });
    userController.subscribeToListUsersStoreEvent((listUsers: any) => {
      this.setProps({ listUsers });
    });
  }

  componentDidUpdate() {
    const messageList = document.querySelector('section.chat-main');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
    return false;
  }

  render() {
    const { user, chats, activeChat, listUsers } = this.props as TChatProps;
    const messages = activeChat?.messages;
    const chatsLayout = chats?.map((chat) => {
      let time: string = '';
      if (chat.last_message) {
        const dateTime: Date = new Date(chat.last_message?.time);
        time = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
      }
      const classList =
        chat.id === activeChat?.id ? 'chat-list__item chat-active' : 'chat-list__item';
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
           ${escape(chat.last_message?.content) || ''}
          </div>
          <div class="chat-list-item__badge">
            ${chat.unread_count}
          </div>
        </div>
      </div>
    </li>`;
    });

    let prevDate: Date;
    let messagesLayout = messages?.sort(byTime).map((message: any) => {
      let dateSeparator: string;
      const dateTime: Date = new Date(message.time);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      if (prevDate && isEqualDate(dateTime, prevDate)) {
        dateSeparator = '';
      } else if (!isToday(dateTime)) {
        dateSeparator = `<div class="chat-main__date">${dateTime.toLocaleString(
          'ru-Ru',
          options,
        )}</div>`;
      } else {
        dateSeparator = `<div class="chat-main__date">Сегодня</div>`;
      }

      prevDate = dateTime;
      const time: string = dateTime.getHours() + ':' + dateTime.getMinutes();
      const classes: string =
        message.user_id === user.id
          ? 'chat-main__message chat-main__message_left'
          : 'chat-main__message chat-main__message_right';

      let messageLayout;
      if (message.type === 'file') {
        messageLayout = `<div class="${classes}">
          <img src="https://ya-praktikum.tech/api/v2/resources${message?.file?.path}" alt="image" 
          class="chat-main__message-image"/>
          <span class="message-date">${time}</span>
        </div>`;
      } else {
        messageLayout = `
        <div class="${classes}">
          ${escape(message.content)}
          <span class="message-date">${time}</span>
        </div>`;
      }

      return `
      ${dateSeparator} ${messageLayout}`;
    });

    if (messagesLayout?.length === 0) {
      messagesLayout = '<div class="chat-main__no-message">Отправьте первое сообщение</div>';
    }

    let findUsers = null;
    if (listUsers && listUsers.length > 0) {
      findUsers = ['<ul class="list-search__users">'];
      const listUsersLayout = listUsers?.map((user) => {
        const userLogin = `${user.login}`;
        const userName = `${user.first_name}${user.second_name}`;
        return `<li class="list-search__item" on:click={{createChat}} data-user=${user.id}>${userLogin}: ${user.first_name} ${user.second_name}</li>`;
      });
      findUsers.push(...listUsersLayout);
      findUsers.push('</ul>');
    }

    const activeChatTitle: string = activeChat?.title || null;

    let userAvatar;
    if (user?.avatar) {
      userAvatar = `
        <img src="https://ya-praktikum.tech/api/v2/resources${user.avatar}" class="chat-list-search__avatar">
      `;
    } else {
      userAvatar = null;
    }
    const context = {
      ...user,
      chats,
      chatsLayout,
      messagesLayout,
      findUsers,
      activeChatTitle,
      userAvatar,
    };

    return chatTmpl.compile(context);
  }
}

export default Chat;

import Templator from '../../helpers/templator';
import './chat-list.scss';
import chatTemplate from './chat.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import TChat from '../helpers/TChat';
import AuthController from '../../controllers/auth-controller';
import ChatController from '../../controllers/chat-controller';
import UserController from '../../controllers/user-controller';
import { byTime } from '../../helpers/sortUtils';
import debounce from '../../helpers/debounce';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();
const chatController = new ChatController();
const userController = new UserController();

interface TChatProps {
  user: TUser;
  chats?: TChat[];
  messages?: any;
  [key: string]: unknown;
}

class Chat extends Block<TChatProps> {
  //searchUser = debounce(userController.searchUser, 1000);

  constructor(props: any = {}) {
    super('div', {
      ...props,

      createChat: (event) => {
        const answer = confirm(`Начать чат?`);
        if (answer) {
          const id = event.target.dataset.user;
          console.log(id);
          const user = this.props.listUsers.find((user) => user.id === +id);
          if (user) {
            chatController.createChat({ title: `${user.first_name} ${user.second_name}` });
          }
        }
      },

      deleteChat: () => {
        chatController.deleteChat({ chatId: 243 });
      },

      addUsers: () => {
        const userLogin = prompt('Введите логин пользователя');
        userController.searchUser(userLogin);
        const user = this.props.listUsers.find((user) => user.login === userLogin);
        if (user) {
          console.log(`User ${user.login} found`);
          chatController.addUsers({
            users: [user.id],
            chatId: this.props.activeChatId,
          });
        } else {
          console.log(`User ${user.login} not found!`);
        }
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
        userController.searchUser(event.target.value);
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
        console.log('hide menu');
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
        this.setProps({ activeChatId: chatId });
      },

      sendMessage: (event: Event) => {
        event.preventDefault();
        const message = event.target[0].value;
        event.target[0].value = '';
        const { chats } = this.props as TChatProps;
        const chat = chats?.find((chat) => chat.id === this.props.activeChatId);
        if (chat) {
          chat.controller.sendMessage(message);
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
      chatController.getChats(user.id);
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
    const { user, chats, activeChatId, listUsers } = this.props as TChatProps;
    const messages = chats?.find((chat) => chat.id === activeChatId)?.messages;
    const chatsLayout = chats?.map((chat) => {
      const dateTime: Date = new Date(chat.last_message?.time);
      const time: string = dateTime.getHours() + ':' + dateTime.getMinutes();
      const classList =
        chat.id === activeChatId ? 'chat-list__item chat-active' : 'chat-list__item';
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
           ${chat.last_message?.content}
          </div>
          <div class="chat-list-item__badge">
            ${chat.unread_count}
          </div>
        </div>
      </div>
    </li>`;
    });

    let prevDate: Date;
    const messagesLayout = messages?.sort(byTime).map((message: any) => {
      let dateSeparator = '';
      const dateTime: Date = new Date(message.time);
      if ((Date.now() - dateTime) / (1000 * 3600 * 24) > 0) {
        dateSeparator = '<div class="chat-main__date">Вчера</div>';
        prevDate = dateTime;
      }
      const time: string = dateTime.getHours() + ':' + dateTime.getMinutes();
      const classes: string =
        message.user_id === user.id
          ? 'chat-main__message chat-main__message_left'
          : 'chat-main__message chat-main__message_right';

      return `
      ${dateSeparator}
      <div class="${classes}">
        ${message.content}
        <span class="message-date">${time}</span>
      </div>`;
    });

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
    const context = { ...user, chats, chatsLayout, messagesLayout, findUsers };

    return chatTmpl.compile(context);
  }
}

export default Chat;

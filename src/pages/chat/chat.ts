/* eslint-disable no-alert */
import Templator from '../../helpers/templator';
import './chat-list.scss';
import chatTemplate from './chat.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';
import TChat, { Message } from '../../helpers/TChat';
import AuthController from '../../controllers/auth-controller';
import ChatController from '../../controllers/chat-controller';
import UserController from '../../controllers/user-controller';
import ResourceController from '../../controllers/resource-controller';
import byTime from '../../helpers/sortUtils';
import { isToday, isEqualDate } from '../../helpers/compareDate';
import escape from '../../helpers/escape';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();
const chatController = new ChatController();
const userController = new UserController();
const resourceController = new ResourceController();

const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

interface TChatProps {
  user?: TUser;
  chats?: TChat[];
  messages?: any;
  activeChat?: TChat;
  listUsers?: TUser[];
}

class Chat extends Block<TChatProps> {
  constructor(props: TChatProps = {}) {
    super('div', {
      ...props,

      createChat: () => {
        const { user } = this.props as TChatProps;
        if (user) {
          chatController.createChat({ title: 'Test chat' }, user.id);
        }
      },

      deleteChat: () => {
        const answer = confirm('Удалить чат?');
        if (answer) {
          const { activeChat, user } = this.props as TChatProps;
          if (activeChat && user) {
            chatController.deleteChat({ chatId: activeChat.id }, user.id);
          }
        }
      },

      addUsers: () => {
        const userLogin = prompt('Введите логин пользователя');
        if (userLogin) {
          userController.searchUser(userLogin).then((listUsers: TUser[]) => {
            const user = listUsers.find((user) => user.login === userLogin);
            const { activeChat } = this.props as TChatProps;
            if (user && activeChat) {
              chatController.addUsers({
                users: [user.id],
                chatId: activeChat.id,
              });
            } else {
              console.log(`User ${userLogin} not found!`);
            }
          });
        }
      },

      deleteUsers: () => {
        const userLogin = prompt('Введите логин пользователя');
        if (userLogin) {
          userController.searchUser(userLogin).then((listUsers: TUser[]) => {
            const user = listUsers.find((user) => user.login === userLogin);
            const { activeChat } = this.props as TChatProps;
            if (user && activeChat) {
              chatController.deleteUsers({
                users: [user.id],
                chatId: activeChat.id,
              });
            } else {
              console.log(`User ${userLogin} not found!`);
            }
          });
        }
      },

      toggleMenu: () => {
        const menu = document.querySelector('.chat-header__menu');
        menu?.classList.toggle('hide');
      },

      toggleMainMenu: () => {
        const menu = document.querySelector('.chat-list__menu');
        menu?.classList.toggle('hide');
      },

      hideMenu: (event: Event) => {
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
        const { id: userId } = this.props.user as TUser;
        const target = event.currentTarget as HTMLElement;
        let chatId: string | number | undefined = target.dataset.id;
        if (chatId !== undefined) {
          chatId = +chatId;
          chatController.getToken({
            userId,
            chatId,
          });
        }
        const { chats } = this.props as TChatProps;
        const chat = chats?.find((chat) => chat.id === chatId);
        this.setProps({ activeChat: chat });
      },

      sendMessage: (event: Event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const message = target.message?.value;
        const escapedMessage = escape(message);
        const chat = this.props.activeChat as TChat;
        if (chat) {
          chat.controller.sendMessage(escapedMessage);
        }
      },

      sendFile: (event: Event) => {
        const image = event.target as HTMLInputElement;
        if (image && image.files && image.files.length > 0) {
          const form = new FormData();
          form.append('resource', image.files[0]);
          resourceController.sendFile({ form }).then((result: { [key: string]: any }) => {
            const chat = this.props.activeChat as TChat;
            if (chat) {
              chat.controller.sendMessage(result?.id, 'file');
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
    authController.getUserInfo((user: TUser) => {
      this.setProps({ user });
      chatController.getChats(user.id).then((chats: TChat[]) => {
        if (chats) {
          this.setProps({ activeChat: chats[0] });
        }
      });
    });
    chatController.subscribeToChatStoreEvent((chats: TChat[]) => {
      this.setProps({ chats });
    });
    userController.subscribeToListUsersStoreEvent((listUsers: any) => {
      this.setProps({ listUsers });
    });
  }

  componentDidUpdate(props: TChatProps) {
    if (props && props.chats && props.chats.length > 0) {
      if (props.chats?.findIndex((chat) => chat.id === props.activeChat?.id) === -1) {
        this.setProps({ activeChat: props.chats[0] });
      }
    }
    return true;
  }

  componentDidRender() {
    const messageList = document.querySelector('section.chat-main');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { user, chats, activeChat, listUsers } = this.props as TChatProps;
    const messages = activeChat?.messages;
    const chatsLayout = chats?.map((chat) => {
      let time: string = '';
      if (chat.last_message) {
        const dateTime: Date = new Date(chat.last_message?.time);
        time = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
      }
      let classList = 'chat-list__item';
      if (chat.id === activeChat?.id) {
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
           ${escape(chat.last_message?.content || '')}
          </div>
          <div class="chat-list-item__badge">
            ${chat.unread_count}
          </div>
        </div>
      </div>
    </li>`;
    });

    let prevDate: Date;
    let messagesLayout: string[] | string | undefined;
    messagesLayout = messages?.sort(byTime).map((message: Message) => {
      let dateSeparator: string;
      const dateTime: Date = new Date(message.time);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      if (prevDate && isEqualDate(dateTime, prevDate)) {
        dateSeparator = '';
      } else if (!isToday(dateTime)) {
        dateSeparator = `<div class="chat-main__date">${dateTime.toLocaleString(
          'ru-Ru',
          options,
        )}</div>`;
      } else {
        dateSeparator = '<div class="chat-main__date">Сегодня</div>';
      }

      prevDate = dateTime;
      const time: string = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
      let classes: string = 'chat-main__message';
      if (+message.user_id === user?.id) {
        classes += ' chat-main__message_left';
      } else {
        classes += ' chat-main__message_right';
      }
      let messageLayout;
      if (message.type === 'file') {
        messageLayout = `<div class="${classes}">
          <img src="${RESOURCES_URL}${message?.file?.path}" alt="image" 
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
        const userName = `${user.first_name} ${user.second_name}`;
        return `<li class="list-search__item" on:click={{createChat}} 
          data-user=${user.id}>${userLogin}: ${userName}}</li>`;
      });
      findUsers.push(...listUsersLayout);
      findUsers.push('</ul>');
    }

    const activeChatTitle: string | null = activeChat?.title || null;

    let userAvatar;
    if (user?.avatar) {
      userAvatar = `
        <img src="${RESOURCES_URL}${user.avatar}" class="chat-list-search__avatar">
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

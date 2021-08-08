import Templator from '../../helpers/templator';
import './chat-list.scss';
import chatTemplate from './chat.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import TChat from '../helpers/TChat';
import AuthController from '../../controllers/auth-controller';
import ChatController from '../../controllers/chat-controller';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();
const chatController = new ChatController();

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

      createChat: () => {
        chatController.createChat({ title: 'first' });
      },

      deleteChat: () => {
        chatController.deleteChat({ chatId: 243 });
      },

      addUsers: () => {
        chatController.addUsers({
          users: [93096],
          chatId: 243,
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
          console.log(chat);
          chat.controller.sendMessage(message);
        }
      },
    });
  }

  componentDidMount() {
    authController.getUserInfo((user: TProps) => {
      this.setProps({ user });
    });
    chatController.subscribeToChatStoreEvent((chats: TChat) => {
      this.setProps({ chats });
    });
    chatController.getChats();
  }

  render() {
    const { user, chats, activeChatId } = this.props as TChatProps;
    const messages = chats?.find((chat) => chat.id === activeChatId)?.messages;
    const chatsLayout = chats?.map((chat) => {
      return `<li class="chat-list__item" on:click={{connectToChat}} data-id=${chat.id}>
      <div class="chat-list-item__avatar">
      </div>
      <div class="chat-list-item__rows">
        <div class="chat-list-item__row">
          <div class="chat-list-item__name">
            ${chat.title}
          </div>
          <div class="chat-list-item__time">
            ${chat.last_message.time}
          </div>
        </div>
        <div class="chat-list-item__row">
          <div class="chat-list-item__message">
           ${chat.last_message.content}
          </div>
          <div class="chat-list-item__badge">
            ${chat.unread_count}
          </div>
        </div>
      </div>
    </li>`;
    });

    const messagesLayout = messages?.reverse().map((message: any) => {
      const classes: string =
        message.user_id === user.id
          ? 'chat-main__message chat-main__message_left'
          : 'chat-main__message chat-main__message_right';

      return `
      <div class="${classes}">
        ${message.content}
        <span class="message-date">${message.time}</span>
      </div>`;
    });

    const context = { ...user, chats, chatsLayout, messagesLayout };

    return chatTmpl.compile(context);
  }
}

export default Chat;

import Templator from '../../helpers/templator';
import './chat-list.scss';
import chatTemplate from './chat.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import TChat from '../helpers/TChat';
import AuthController from '../../controllers/auth-controller';
import ChatController from '../../controllers/chat-controller';
import ChatSocketController from '../../controllers/chat-socket-controller';
import UserStore from '../../stores/UserStore';
import ChatStore from '../../stores/ChatStore';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();
const chatController = new ChatController();

interface TChatProps {
  user: TUser;
  chats?: TChat[];
  [key: string]: unknown;
}

class Chat extends Block<TChatProps> {
  chats: {
    id: number;
    chat: ChatSocketController;
  }[] = [];

  constructor(props: any = {}) {
    super('div', {
      ...props,
      getChats: () => {
        chatController.getChats();
      },

      createChat: () => {
        chatController.createChat({ title: 'first' });
      },

      getToken: () => {
        chatController.getToken({ chatId: 243 });
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

      selectChat: () => {
        const { id: userId } = UserStore.getState() as TUser;
        console.log(ChatStore.getState());
        const chatList = ChatStore.getState() as TChat[];
        const { id: chatId, token } = chatList[0];
        console.log(userId, chatId, token);
        const chatSocketController = new ChatSocketController(
          userId,
          chatId,
          token,
        );
        const chatIndex = this.chats.findIndex((chat) => chat.id === chatId);
        if (chatIndex === -1) {
          this.chats.push({
            id: chatId,
            chat: chatSocketController,
          });
        } else {
          this.chats[chatIndex].chat = chatSocketController;
        }
      },

      sendMessage: () => {
        const { user } = this.props as TChatProps;
        this.chats[0].chat.sendMessage(`User: ${user.id}: Socket message test`);
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
    chatController.getToken({ chatId: 243 });
    chatController.getChats();
  }

  render() {
    const { user, chats } = this.props as TChatProps;
    const context = { ...user, chats };
    console.log(user);
    console.log(chats);
    return chatTmpl.compile(context);
  }
}

export default Chat;

import Templator from '../../helpers/templator';
import './chat-list.scss';
import chatTemplate from './chat.tmpl';
import Block, { TProps } from '../../components/block/block';
import TUser from '../../helpers/TUser';
import AuthController from '../../controllers/auth-controller';
import ChatController from '../../controllers/chat-controller';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();
const chatController = new ChatController();

interface TChatProps {
  user?: TUser;
  [key: string]: unknown;
}

class Chat extends Block<TChatProps> {
  constructor(props: TChatProps = {}) {
    super('div', {
      ...props,
      getChats: () => {
        chatController.getChats();
      },

      createChat: () => {
        chatController.createChat({ title: 'first' });
      },

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
    });
  }

  componentDidMount() {
    authController.getUserInfo((user: TProps) => {
      this.setProps({ user });
    });
  }

  render() {
    const { user } = this.props as TChatProps;
    const context = { ...user };
    return chatTmpl.compile(context);
  }
}

export default Chat;

import Templator from '../../helpers/templator';
import chatTemplate from './chat.tmpl';
import Block, { TProps } from '../../components/block/block';
import AuthController from '../../controllers/auth-controller';

const chatTmpl = new Templator(chatTemplate);
const authController = new AuthController();

interface TChatProps {
  [key: string]: unknown;
}

class Chat extends Block<TChatProps> {
  constructor(props: TChatProps = {}) {
    super('div', props);
  }

  componentDidMount() {
    authController.getUserInfo((user: TProps) => {
      this.setProps({ user });
    });
  }

  render() {
    return chatTmpl.compile(this.props);
  }
}

export default Chat;

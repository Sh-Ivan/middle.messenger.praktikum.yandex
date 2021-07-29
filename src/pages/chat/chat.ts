import Templator from '../../helpers/templator';
import chatTemplate from './chat.tmpl';
import Block from '../../components/block/block';

const chatTmpl = new Templator(chatTemplate);

interface TChatProps {
  [key: string]: unknown;
}

class Chat extends Block<TChatProps> {
  constructor(props: TChatProps = {}) {
    super('div', props);
  }

  render() {
    return chatTmpl.compile(this.props);
  }
}

export default Chat;

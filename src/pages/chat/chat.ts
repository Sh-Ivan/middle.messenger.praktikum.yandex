import Templator from '../../../utils/templator';
import chatTemplate from './chat.tmpl';
import Block from '../../components/block/block';

const chatTmpl = new Templator(chatTemplate);

class Chat extends Block {
  constructor(props: object = {}) {
    super('div', props);
  }

  render() {
    return chatTmpl.compile(this.props);
  }
}

export default Chat;

import Templator from '../../helpers/templator';
import chatTemplate from './chat.tmpl';
import Block from '../block/block';
import TUser from '../../helpers/TUser';
import './chat.scss';

const chatTmpl = new Templator(chatTemplate);

type chatProps = {
  user?: TUser;
};

class chat extends Block<chatProps> {
  constructor(props: chatProps = {}) {
    super('div', props);
  }

  render() {
    const context = {};
    return chatTmpl.compile(context);
  }
}

export default chat;

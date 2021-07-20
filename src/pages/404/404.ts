import Templator from '../../../utils/templator';
import page404Template from './404.tmpl';
import Block from '../../components/block/block';

const page404Tmpl = new Templator(page404Template);

class Page404 extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return page404Tmpl.compile(this.props);
  }
}

export default Page404;

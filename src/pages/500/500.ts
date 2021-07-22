import Templator from '../../../utils/templator';
import page500Template from './500.tmpl';
import Block from '../../components/block/block';

const page500Tmpl = new Templator(page500Template);

class Page500 extends Block {
  constructor() {
    super('div');
  }

  render() {
    return page500Tmpl.compile();
  }
}

export default Page500;

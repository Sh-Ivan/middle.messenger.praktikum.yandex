import Templator from '../../helpers/templator';
import page500Template from './500.tmpl';
import Block from '../../components/block/block';

const page500Tmpl = new Templator(page500Template);

type page500Props = {};

class Page500 extends Block<page500Props> {
  constructor(props: page500Props = {}) {
    super('div', props);
  }

  render() {
    return page500Tmpl.compile();
  }
}

export default Page500;

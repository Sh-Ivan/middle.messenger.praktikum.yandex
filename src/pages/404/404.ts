import Templator from '../../helpers/templator';
import page404Template from './404.tmpl';
import Block from '../../components/block/block';

const page404Tmpl = new Templator(page404Template);

type page404Props = {};

class Page404 extends Block<page404Props> {
  constructor(props: page404Props = {}) {
    super('div', props);
  }

  render() {
    return page404Tmpl.compile();
  }
}

export default Page404;

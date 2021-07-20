import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';

const loginTmpl = new Templator(loginTemplate);

class Login extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return loginTmpl.compile(this.props);
  }
}

export default Login;

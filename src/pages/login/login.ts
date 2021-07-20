import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';

const loginTmpl = new Templator(loginTemplate);

class Login extends Block {
  constructor(props) {
    super('div', props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
    // e.preventDefault();
    console.log('click');
  }

  render() {
    const context = {
      handleSubmit: function hs() {
        console.log('submit');
        return false;
      },
    };
    return loginTmpl.compile(context);
  }
}

export default Login;

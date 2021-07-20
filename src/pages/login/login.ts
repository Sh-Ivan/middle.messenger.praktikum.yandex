import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';
import Block from '../../components/block/block';

const loginTmpl = new Templator(loginTemplate);

class Login extends Block {
  constructor(props) {
    super('div', props);
  }
/*
  handleSubmit(e) {
    e.preventDefault();
  }
  */
  handleClick(e) {
    console.log('1111111111111111111111   click');
    e.preventDefault();
  }

  render() {
    const context = {
      
    };
    return loginTmpl.compile(context);
  }
}

export default Login;

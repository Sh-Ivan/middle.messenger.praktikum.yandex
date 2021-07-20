import Templator from '../../../utils/templator';
import signupTemplate from './signup.tmpl';
import Block from '../../components/block/block';

const signupTmpl = new Templator(signupTemplate);

class Signup extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return signupTmpl.compile(this.props);
  }
}

export default Signup;

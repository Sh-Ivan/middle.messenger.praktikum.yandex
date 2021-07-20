import Templator from '../../../utils/templator';
import changePasswordTemplate from './change-password.tmpl';
import Block from '../../components/block/block';

const changePasswordTmpl = new Templator(changePasswordTemplate);

class ChangePassword extends Block {
  constructor(props) {
    super('div', props);
  }

  render() {
    return changePasswordTmpl.compile(this.props);
  }
}

export default ChangePassword;

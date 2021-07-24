import Templator from '../../helpers/templator';
import changePasswordTemplate from './change-password.tmpl';
import Block from '../../components/block/block';
import TUser from '../../helpers/TUser';

const changePasswordTmpl = new Templator(changePasswordTemplate);

type changePasswordProps = {
  user?: TUser;
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class ChangePassword extends Block<changePasswordProps> {
  constructor(props: changePasswordProps) {
    super('div', props);
  }

  render() {
    return changePasswordTmpl.compile({});
  }
}

export default ChangePassword;

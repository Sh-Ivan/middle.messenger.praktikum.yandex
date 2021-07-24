import Templator from '../../helpers/templator';
import signupTemplate from './signup.tmpl';
import Block from '../../components/block/block';

const signupTmpl = new Templator(signupTemplate);

type signupdProps = {
  handleSubmit: (e: Event) => void;
  handleBlur: (e: Event) => void;
  handleFocus: (e: Event) => void;
};

class Signup extends Block<signupdProps> {
  constructor(props: signupdProps) {
    super('div', props);
  }

  render() {
    return signupTmpl.compile({});
  }
}

export default Signup;

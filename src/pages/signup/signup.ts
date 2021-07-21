import Templator from '../../../utils/templator';
import signupTemplate from './signup.tmpl';
import Block from '../../components/block/block';

const signupTmpl = new Templator(signupTemplate);

class Signup extends Block {
  constructor(props) {
    super('div', props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = {};
    const { elements } = e.currentTarget;
    for (const element of elements) {
      if (element.type !== 'submit') {
        formData[element.name] = element.value;
      }
    }
    console.log(formData);
  }

  render() {
    return signupTmpl.compile(this.props);
  }
}

export default Signup;

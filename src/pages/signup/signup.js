import Templator from '../../../utils/templator';
import signupTemplate from './signup.tmpl';
import './signup.scss';

const signupTmpl = new Templator(signupTemplate);
const context = {
	name: 'John Doe',
};

export default content = signupTmpl.compile(context);

import Templator from '../../../utils/templator';
import signupTemplate from './signup.tmpl';

const signupTmpl = new Templator(signupTemplate);
const context = {};

export default signupTmpl.compile(context);

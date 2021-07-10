import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';

const loginTmpl = new Templator(loginTemplate);
const context = {};

export default loginTmpl.compile(context);

import Templator from '../../../utils/templator';
import loginTemplate from './change-password.tmpl';

const loginTmpl = new Templator(loginTemplate);
const context = {};

export default loginTmpl.compile(context);

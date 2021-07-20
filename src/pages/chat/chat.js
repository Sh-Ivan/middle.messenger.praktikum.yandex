import Templator from '../../../utils/templator';
import loginTemplate from './chat.tmpl';

const loginTmpl = new Templator(loginTemplate);
const context = {};

export default loginTmpl.compile(context);

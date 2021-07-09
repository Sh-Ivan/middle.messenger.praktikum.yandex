import Templator from '../../../utils/templator';
import loginTemplate from './404.tmpl';

const loginTmpl = new Templator(loginTemplate);
const context = {};

export default loginTmpl.compile(context);

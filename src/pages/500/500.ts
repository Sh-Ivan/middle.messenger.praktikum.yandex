import Templator from '../../../utils/templator';
import loginTemplate from './500.tmpl';

const loginTmpl = new Templator(loginTemplate);
const context = {};

export default loginTmpl.compile(context);

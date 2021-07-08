import Templator from '../../../utils/templator';
import loginTemplate from './500.tmpl';
import './500.scss';

const loginTmpl = new Templator(loginTemplate);
const context = {
	name: 'Ivan',
	isLogin: true,
};

export default loginTmpl.compile(context);

import Templator from '../../../utils/templator';
import loginTemplate from './login.tmpl';
import './login.scss';

const loginTmpl = new Templator(loginTemplate);
const context = {
	name: 'Ivan',
	isLogin: true,
};

export default content = loginTmpl.compile(context);

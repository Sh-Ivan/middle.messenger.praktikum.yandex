import Templator from '../../../utils/templator';
import loginTemplate from './chat.tmpl';
import './chat.scss';

const loginTmpl = new Templator(loginTemplate);
const context = {
	name: 'Ivan',
	isLogin: true,
};

export default content = loginTmpl.compile(context);

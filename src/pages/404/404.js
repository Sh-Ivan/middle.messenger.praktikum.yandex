import Templator from '../../../utils/templator';
import loginTemplate from './404.tmpl';
import './404.scss';

const loginTmpl = new Templator(loginTemplate);
const context = {
	name: 'Ivan',
	isLogin: true,
};

export default content = loginTmpl.compile(context);

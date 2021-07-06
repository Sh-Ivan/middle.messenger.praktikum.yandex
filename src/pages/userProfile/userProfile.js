import Templator from '../../../utils/templator';
import userProfileTemplate from './userProfile.tmpl';
import './userProfile.scss';

const userProfileTmpl = new Templator(userProfileTemplate);
const context = {
	name: 'Ivan',
	isLogin: true,
};

export default content = userProfileTmpl.compile(context);

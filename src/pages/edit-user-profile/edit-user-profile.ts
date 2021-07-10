import Templator from '../../../utils/templator';
import userProfileTemplate from './edit-user-profile.tmpl';

const userProfileTmpl = new Templator(userProfileTemplate);
const context = {
	name: 'Андрей',
	email: 'pochta@yandex.ru',
	login: 'ivan',
};

export default userProfileTmpl.compile(context);

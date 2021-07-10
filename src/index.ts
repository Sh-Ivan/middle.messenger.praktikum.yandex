import './index.scss';
import login from './pages/login/login';
import signup from './pages/signup/signup';
import page404 from './pages/404/404';
import page500 from './pages/500/500';
import chat from './pages/chat/chat';
import userProfile from './pages/user-profile/user-profile';
import changePassword from './pages/change-password/change-password';
import editUserProfile from './pages/edit-user-profile/edit-user-profile';

const pathname: string = window.location.pathname;

const router = {
	'/': chat,
	'/login': login,
	'/signup': signup,
	'/chat': chat,
	'/user': userProfile,
	'/page404': page404,
	'/page500': page500,
	'/change-password': changePassword,
	'/edit-user-profile': editUserProfile,
};

const pageContent = router[pathname] ? router[pathname] : page404;

const root: HTMLElement | null = document.querySelector('.root');

if (root !== null) {
	root.innerHTML = pageContent;
}

import login from './pages/login/login';
import signup from './pages/signup/signup';
import page404 from './pages/404/404';
import chat from './pages/chat/chat';
import userProfile from './pages/userProfile/userProfile';

const pathname = window.location.pathname;

const router = {
	'/': login,
	'/login': login,
	'/signup': signup,
	'/chat': chat,
	'/user': userProfile,
};

const pageContent = router[pathname] ?? page404;

const root = document.querySelector('.root');

root.innerHTML = pageContent;

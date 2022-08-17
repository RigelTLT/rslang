import './style.scss';
// import { Login } from './components/login/login';
import { ulListenner } from './components/uiListener/uiListener';
import { getLocalStorageToken } from './components/authorization/auth';

getLocalStorageToken();
// const login = new Login();
// login.loginBtn();
ulListenner();

import './style.scss';
import { getWords } from './components/api/basicApi';
// import { Login } from './components/login/login';
import { ulListenner } from './components/uiListener/uiListener';

getWords();
// const login = new Login();
// login.loginBtn();
ulListenner();

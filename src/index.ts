import './style.scss';
// import { Login } from './components/login/login';
import { ulListenner } from './components/uiListener/uiListener';
import { getLocalStorageToken, authorization } from './components/authorization/auth';
const localStorage = new getLocalStorageToken;
if(localStorage.id){
const params = {id:  localStorage.id, token:  localStorage.token, name:  localStorage.name};
authorization(params);}
// const login = new Login();
// login.loginBtn();
ulListenner();

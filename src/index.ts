import './style.scss';
import { ulListenner } from './components/uiListener/uiListener';
import { GetLocalStorageToken, authorization } from './components/authorization/auth';

document.addEventListener('DOMContentLoaded', function () {
  const localStorage = new GetLocalStorageToken();
  if (localStorage.id) {
    const params = { id: localStorage.id, token: localStorage.token, name: localStorage.name };
    authorization(params);
  }
  ulListenner();
});

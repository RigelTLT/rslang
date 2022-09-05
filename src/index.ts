import './style.scss';
import { ulListenner } from './components/uiListener/uiListener';
import { GetLocalStorageToken, authorization } from './components/authorization/auth';
import { getStatistic, putStatistic } from './api/statisticApi';

document.addEventListener('DOMContentLoaded', async function () {
  const localStorage = new GetLocalStorageToken();

  if (localStorage.id) {
    const params = {
      id: localStorage.id,
      token: localStorage.token,
      name: localStorage.name,
      refreshToken: localStorage.refreshToken
    };
    authorization(params);
  }

  ulListenner();
});

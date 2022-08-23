import './style.scss';
import { ulListenner } from './components/uiListener/uiListener';
import { GetLocalStorageToken, authorization } from './components/authorization/auth';
import { Sprint } from './components/sprint/sprint';
import { AudioCall } from './components/audio-call/audio-call';

document.addEventListener('DOMContentLoaded', function () {
  const namePage = document.location.pathname;

  if (namePage === '/sprint.html') {
    const sprint = new Sprint();
    sprint.start();
  } else {
    const audioCall = new AudioCall();
    audioCall.start();
  }

  const localStorage = new GetLocalStorageToken();
  if (localStorage.id) {
    const params = { id: localStorage.id, token: localStorage.token, name: localStorage.name };
    authorization(params);
  }
  ulListenner();
});

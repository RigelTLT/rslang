import './style.scss';
import { ulListenner } from './components/uiListener/uiListener';
import { getLocalStorageToken, authorization } from './components/authorization/auth';
import Game from './components/game/game';

document.addEventListener('DOMContentLoaded', function(event){
  const namePage = document.location.pathname;
  console.log(document.location.search, "параметры страницы");
  if(namePage === '/audio-call.html' || namePage === '/sprint.html') {
    const game = new Game()
    game.createLibrary()
    game.renderTemplate(game.checkGameName())
  }


  const localStorage = new getLocalStorageToken();
  if (localStorage.id) {
    const params = { id: localStorage.id, token: localStorage.token, name: localStorage.name };
    authorization(params);
  }
  ulListenner();
})

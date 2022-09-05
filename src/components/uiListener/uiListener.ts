import { Login } from '../login/login';
import { signToToken, registration, logOut, GetLocalStorageToken } from '../authorization/auth';
import {
  sound,
  changePage,
  addCompoundWord,
  studiedCompoundWord,
  cheakPageToComplete,
  getPageGroupTextbook
} from './../textbook/textbook';
import { deletewordsUserApi } from '../../api/wordsApi';
import { removeCompoundWord, getPageGroupDictionary } from './../textbook/dictionary';

const login = new Login();

export function ulListenner() {
  document.body.addEventListener('click', async function (event) {
    const popUp = document.querySelector('.login-popUp') as HTMLDivElement;
    const menu = document.querySelector('.login-popUp .menu') as HTMLDivElement;
    const target = event.target as HTMLElement;
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (target.closest('.close') || !target.closest('.menu')) {
      popUp.style.transform = 'translateX(100%)';
    }

    if (target.closest('.account')) {
      menu.innerHTML = login.templateLogin();
      popUp.style.transform = 'translateX(0%)';
    }

    if (target.closest('.signIn')) {
      menu.innerHTML = login.templateRegistration();
    } else if (target.closest('.registration')) {
      menu.innerHTML = login.templateLogin();
    }
    if (target.closest('.sign__button')) {
      const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;

      const password = (document.querySelector('input[name="password"]') as HTMLInputElement).value;
      if (EMAIL_REGEXP.test(email) && password.length >= 8) {
        event.preventDefault();
        const dataLogin = { email: email, password: password };
        await signToToken(dataLogin);
        location.reload();
      }
    }
    if (target.closest('.registration__button')) {
      const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
      const name = (document.querySelector('input[name="login"]') as HTMLInputElement).value;
      const password = (document.querySelector('input[name="pass"]') as HTMLInputElement).value;
      if (EMAIL_REGEXP.test(email) && password.length > 8 && name) {
        event.preventDefault();
        const dataLogin = { name: name, email: email, password: password };
        registration(dataLogin);
      }
    }
    if (target.closest('.account__out')) {
      logOut();
    }
    if (target.closest('.audio')) {
      const id = target.dataset.id as string;
      sound(id);
    }
    if (target.closest('.back-all')) {
      const button = 'back-all';
      changePage(button);
    }
    if (target.closest('.back')) {
      const button = 'back';
      changePage(button);
    }
    if (target.closest('.forward')) {
      const button = 'forward';
      changePage(button);
    }
    if (target.closest('.forward-all')) {
      const button = 'forward-all';
      changePage(button);
    }
    if (target.closest('.cont-button__add')) {
      const card = (target.parentNode as HTMLElement).parentNode as HTMLElement;
      const wordId = card.dataset.id as string;
      if (!card.classList.contains('hard')) {
        card.classList.add('hard');
        const localStorage = new GetLocalStorageToken();
        addCompoundWord(localStorage.id, wordId, localStorage.token);
        (target as HTMLInputElement).disabled = true;
        const buttonDelete = (target.parentNode as HTMLElement).childNodes[1] as HTMLInputElement;
        buttonDelete.disabled = false;
      }
    }
    if (target.closest('.cont-button__remove')) {
      const card = (target.parentNode as HTMLElement).parentNode as HTMLElement;
      if (card.classList.contains('hard')) {
        card.classList.remove('hard');
        const localStorage = new GetLocalStorageToken();
        const wordId = card.dataset.id as string;
        deletewordsUserApi(localStorage.id, wordId, localStorage.token);
        cheakPageToComplete();
        const buttonDelete = (target.parentNode as HTMLElement).childNodes[1] as HTMLInputElement;
        const buttonAdd = (target.parentNode as HTMLElement).childNodes[0] as HTMLInputElement;
        buttonDelete.disabled = true;
        buttonAdd.disabled = false;
      }
    }
    if (target.closest('.cont-button__remove-to-dictionary')) {
      const card = target.parentNode as HTMLElement;
      const localStorage = new GetLocalStorageToken();
      const wordId = card.dataset.id as string;
      removeCompoundWord(localStorage.id, wordId, localStorage.token);
    }
    if (target.closest('.cont-button__studied')) {
      const card = (target.parentNode as HTMLElement).parentNode as HTMLElement;
      const wordId = card.dataset.id as string;
      if (!card.classList.contains('studied')) {
        card.classList.add('studied');
        const localStorage = new GetLocalStorageToken();
        studiedCompoundWord(localStorage.id, wordId, localStorage.token);
      }
      const buttonDelete = (target.parentNode as HTMLElement).childNodes[1] as HTMLInputElement;
      const buttonAdd = (target.parentNode as HTMLElement).childNodes[0] as HTMLInputElement;
      buttonDelete.disabled = true;
      buttonAdd.disabled = true;
      (target as HTMLInputElement).disabled = true;
    }
  });
}
if (window.location.pathname === '/ebook.html') getPageGroupTextbook();
if (window.location.pathname === '/dictionary.html') getPageGroupDictionary();

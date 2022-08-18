import { Login } from '../login/login';
import { signToToken, registration, logOut } from '../authorization/auth';
import { sound, changePage } from './../textbook/textbook';
const login = new Login();

export function ulListenner() {
  document.body.addEventListener('click', async function (event) {
    const popUp = document.querySelector('.login-popUp') as HTMLDivElement;
    const menu = document.querySelector('.login-popUp .menu') as HTMLDivElement;
    const target = event.target as HTMLElement;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    console.log(target);
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
      if(EMAIL_REGEXP.test(email) && password.length>8){
      event.preventDefault();
      const dataLogin ={email:email, password: password};
      await signToToken(dataLogin);
      location.reload();
    }
  }
    if (target.closest('.registration__button')) {
      const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
      const name = (document.querySelector('input[name="login"]') as HTMLInputElement).value;
      const password = (document.querySelector('input[name="pass"]') as HTMLInputElement).value;
      if(EMAIL_REGEXP.test(email) && password.length>8 && name){
        event.preventDefault();
      const dataLogin ={name: name, email: email, password: password};
      registration(dataLogin);
    }
    }
    if (target.closest('.account__out')) {
      logOut();
    }
    if (target.closest('.word-audio')) {
      const targetAudio = 'audio';
      const id = target.dataset.id as string;
      sound(id, targetAudio, '.word-audio');
    }
    if (target.closest('.example-audio')) {
      const targetAudio = 'audioExample';
      const id = target.dataset.id as string
      sound(id, targetAudio, '.example-audio');
    }
    if (target.closest('.meaning-audio')) {
      const targetAudio = 'audioMeaning';
      const id = target.dataset.id as string;
      sound(id, targetAudio, '.meaning-audio');
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
  });
}

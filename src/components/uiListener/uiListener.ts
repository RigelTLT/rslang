import { Login } from '../login/login';
import { signToToken, registration } from '../authorization/auth';
const login = new Login();

export function ulListenner() {
  document.body.addEventListener('click', function (event) {
    const popUp = document.querySelector('.login-popUp') as HTMLDivElement;
    const menu = document.querySelector('.login-popUp .menu') as HTMLDivElement;
    const target = event.target as HTMLElement;
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
      if(email && password) {
        const dataLogin ={email:email, password: password};
      signToToken(dataLogin);
      }
    }
    if (target.closest('.registration__button')) {
      const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value;
      const name = (document.querySelector('input[name="login"]') as HTMLInputElement).value;
      const password = (document.querySelector('input[name="pass"]') as HTMLInputElement).value;
      const dataLogin ={name: name, email: email, password: password};
      registration(dataLogin);
    }
  });
}

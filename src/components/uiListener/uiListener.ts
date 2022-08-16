import { Login } from '../login/login';
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
  });
}

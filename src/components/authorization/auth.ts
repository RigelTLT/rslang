import { Iauth, Isignin, Iregist } from '../interface/interface';
import { signinApi, registrationApi } from '../api/authApi';

function setLocalStorageAuth(id: string, token: string) {
  localStorage.setItem('id', JSON.stringify(id));
  localStorage.setItem('token', JSON.stringify(token));
}

export async function authorization() {
  //TODO замена элементов при авторизации
}



export async function signToToken(params:Isignin) {
  let paramsAuth : Iauth;
    paramsAuth = await signinApi(params);
    if(typeof paramsAuth === 'number'){
      const textMenu = document.querySelector('.menu__text') as HTMLElement;
      if(paramsAuth === 404){
      textMenu.innerHTML = 'Такой почты не существует!';
    }
    if(paramsAuth === 403){
      textMenu.innerHTML = 'Неправильный адрес электронной почты или пароль!';
    }
    textMenu.style.color = 'red';
    textMenu.style.fontSize = 'x-large';
  }
    else{
      setLocalStorageAuth(paramsAuth.userId, paramsAuth.token);
      authorization();
    }
}

export async function registration(params: Iregist) {
  try {
    const code = await registrationApi(params);
    console.log(code);
    signToToken({email: params.email, password: params.password});
  }catch{
    const textMenu = document.querySelector('.menu__text') as HTMLElement;
    textMenu.innerHTML = 'Такая почта уже занята';
    textMenu.style.color = 'red';
    textMenu.style.fontSize = 'x-large';
  }
  
  
}

function getLocalStorageToken() {
  if (localStorage.getItem('tokens')) {
    const tokens = JSON.parse(localStorage.getItem('tokens') as string) as Isignin;
    signToToken(tokens);
  }
}


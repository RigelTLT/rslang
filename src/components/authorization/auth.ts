import { Iauth, Isignin, Iregist, IidToken } from '../interface/interface';
import { signinApi, registrationApi } from '../api/authApi';

function setLocalStorageAuth(id: string, token: string, name: string) {
  localStorage.setItem('id', JSON.stringify(id));
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('name', JSON.stringify(name));
}

export function authorization(params: IidToken) {
  //TODO замена элементов при авторизации
  const accountLink = document.querySelector('.account__text') as HTMLElement;
  const accountContainer = document.querySelector('.account') as HTMLElement;
  if(accountContainer.classList.contains('account')){
  accountContainer.classList.remove('account');
  accountContainer.classList.add('account__out');
}
  accountLink.innerHTML = `${params.name}/Log Out`;
}

export function logOut(){
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  location.reload();
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
      setLocalStorageAuth(paramsAuth.userId, paramsAuth.token, paramsAuth.name);
      const params = {id: paramsAuth.userId, token: paramsAuth.token, name: paramsAuth.name}
      authorization(params);
    }
}

export async function registration(params: Iregist) {
  try {
    const code = await registrationApi(params);
    await signToToken({email: params.email, password: params.password});
    location.reload();
  }catch{
    const textMenu = document.querySelector('.menu__text') as HTMLElement;
    textMenu.innerHTML = 'Такая почта уже занята';
    textMenu.style.color = 'red';
    textMenu.style.fontSize = 'x-large';
  }
}

export class getLocalStorageToken {
  get token() {
    const tokens = JSON.parse(localStorage.getItem('token') as string) as string;
    return tokens;
  }
  get id(){
    const id = JSON.parse(localStorage.getItem('id') as string) as string;
    return id;
  }
   get name(){
    const name = JSON.parse(localStorage.getItem('name') as string) as string;
    return name;
   }
  }


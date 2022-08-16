import { Iauth, Isignin } from '../interface/interface';
import { signinApi, registrationApi } from '../api/authApi';

export async function authorization() {
  
}



export async function signToToken(params:Isignin) {
  let paramsAuth : Iauth;
  try{
    paramsAuth = await signinApi(params);
  } catch{
    console.log('Ошибка авторизации');
  }
  //TODO вызов функции авторизации
}

export async function registration() {
  //TODO: Сменить запросы селекторов
  const name = (document.querySelector('#login') as HTMLInputElement).innerHTML;
  const email = (document.querySelector('#email') as HTMLInputElement).innerHTML;
  const password = (document.querySelector('#password') as HTMLInputElement).innerHTML;
  const params = {name: name, email: email, password: password};
  const code = await registrationApi(params);
  console.log(code);
  if(code === '200'){
    signToToken({email: email, password: password});
  }
}

function getLocalStorageToken() {
  if (localStorage.getItem('tokens')) {
    const tokens = JSON.parse(localStorage.getItem('tokens') as string) as Isignin;
    signToToken(tokens);
  }
}


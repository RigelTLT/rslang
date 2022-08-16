import { baseUrl, path } from './basicApi';
import { Isignin, Iregist } from './../interface/interface';

export async function signinApi(body?: Isignin) {
  let params = {
    email: '',
    password: ''
  };
  if(body){
    params = body;
  }
  const response = await fetch(`${baseUrl}${path.signin}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const employee = await response.json();
  return employee;
}
export async function newTokenSigninApi(id:string){
  const response = await fetch(`${baseUrl}${path.words}/${id}/${path.tokens}`);
  const data = await response.json();
  return data;
}
export async function registrationApi(body: Iregist) {
  let params = {
    name: '',
    email: '',
    password: ''
  };
  if(body){
    params = body;
  }
  const response = await fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const employee = await response.json();
  return employee;
}
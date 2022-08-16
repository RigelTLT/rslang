import { baseUrl, path } from './basicApi';
import { Isignin } from './../interface/interface';

export async function signin(body?: Isignin) {
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
export async function newTokenSignin(id:string){
  const response = await fetch(`${baseUrl}${path.words}/${id}/${path.tokens}`);
  const data = await response.json();
  return data;
}
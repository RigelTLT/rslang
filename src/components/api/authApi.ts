import { baseUrl, path } from './basicApi';
import { Isignin, Iregist } from '../../types/interface';

export async function signinApi(body?: Isignin) {
  let params = {
    email: '',
    password: ''
  };
  if (body) {
    params = body;
  }
  const response = await fetch(`${baseUrl}${path.signin}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  if (response.ok) {
    const employee = await response.json();
    return employee;
  } else {
    return response.status;
  }
}
export async function newTokenSigninApi(id: string) {
  const response = await fetch(`${baseUrl}${path.words}/${id}/${path.tokens}`);
  const data = await response.json();
  return data;
}
export async function registrationApi(body: Iregist) {
  const response = await fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (response) {
    const employee = await response.json();
    if (response.ok) {
      return employee;
    } else {
      return employee.error.errors[0].message;
    }
  }
}

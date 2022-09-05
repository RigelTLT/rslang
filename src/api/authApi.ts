import { baseUrl, path, headers } from './basicApi';
import { Isignin, Iregist } from '../types/interface';

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

export async function newTokenSigninApi(id: string, token: string) {
  console.log(id, token);
  console.log(`${baseUrl}${path.users}/${id}/${path.tokens}`);
  const response = await fetch(`${baseUrl}${path.users}/${id}/${path.tokens}`, {
    method: 'GET',
    headers: headers(token)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));
  return response;
}

export async function getUser(id: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}`, {
    method: 'GET',
    headers: headers(token)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));
  return response;
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

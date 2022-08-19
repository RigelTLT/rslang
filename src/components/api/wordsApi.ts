import { baseUrl, path } from './basicApi';
import { IuserWords } from './../interface/interface';

export async function getUserAllWords(id: string, token: string){
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  return data;
}
export async function getUserIdWords(id: string, idWord: string, token: string){
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
    if(response.ok){
      const employee = await response.json();
      return employee;
    }else{
      return null;
    }
}
export async function addWordsUserApi(id: string, idWord: string, token: string, body: IuserWords) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
     if(response.ok){
      const employee = await response.json();
      return employee;
    }else{
      return null;
    }
}
export async function UpdateWordsUserApi(id: string, idWord: string, token: string, body: IuserWords) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
     if(response.ok){
      const employee = await response.json();
      return employee;
    }else{
      return null;
    }
}
export async function deleteordsUserApi(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'DELETE',
  });
     if(response.ok){
      const employee = await response.json();
      return employee;
    }else{
      return null;
    }
}
import { baseUrl, path } from './basicApi';
import { IuserWords } from './../interface/interface';
import { getLocalStorageToken } from './../authorization/auth';
const localStorage = new getLocalStorageToken;


export async function getUserAllWords(id: string){
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
    },
  });
  const data = await response.json();
  return data;
}
export async function getUserIdWords(id: string, idWord: string){
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
    },
  }).catch(err => {return null});
  if(response){
    const employee = await response.json();
    if(response.ok){
      return employee;
    }else{
      return null;
    }
  } 
}
export async function addWordsUserApi(id: string, idWord: string, body: IuserWords) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(body),
  });
  if(response){
  const employee = await response.json();
  if(response.ok){
    return employee;
  }else{
    return employee.error.errors[0].message;
  } 
} 
}
export async function UpdateWordsUserApi(id: string, idWord: string, body: IuserWords) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if(response){
  const employee = await response.json();
  if(response.ok){
    return employee;
  }else{
    return employee.error.errors[0].message;
  } 
} 
}
export async function deleteordsUserApi(id: string, idWord: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'DELETE',
  });
  if(response){
  const employee = await response.json();
  if(response.ok){
    return employee;
  }else{
    return employee.error.errors[0].message;
  } 
} 
}
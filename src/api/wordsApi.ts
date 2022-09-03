import { baseUrl, path } from './basicApi';
import { IapiWords, IgetUserAllWords } from '../types/interface';

export async function getUserAllWords(id: string, token: string): Promise<IgetUserAllWords[]> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((data) => data.json());
  // .catch(() => {
  //   throw new Error('Произошла ошибка, попробуйте снова');
  // });

  return response;
}

export async function getUserIdWords(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((data) => data.json());
  // .catch(() => {
  //   throw new Error('Произошла ошибка, попробуйте снова');
  // });

  return response;
}

export async function addWordsUserApi({ id, idWord, token, body }: IapiWords): Promise<IgetUserAllWords> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((data) => data.json());
  // .catch(() => {
  //   throw new Error('Произошла ошибка, попробуйте снова');
  // });

  return response;
}

export async function UpdateWordsUserApi({ id, idWord, token, body }: IapiWords): Promise<IgetUserAllWords> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((data) => data.json());
  // .catch(() => {
  //   throw new Error('Произошла ошибка, попробуйте снова');
  // });

  return response;
}

export async function deleteordsUserApi(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((data) => data.json());
  // .catch(() => {
  //   throw new Error('Произошла ошибка, попробуйте снова');
  // });

  return response;
}

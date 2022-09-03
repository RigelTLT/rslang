import { baseUrl, path } from './basicApi';
import { IapiWords, IgetUserAllWords } from '../types/interface';

export async function getUserAllWords(id: string, token: string): Promise<IgetUserAllWords[] | null> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response.ok ? response.json() : null;
}

export async function getUserIdWords(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response.ok ? response.json() : null;
}

export async function addWordsUserApi({ id, idWord, token, body }: IapiWords): Promise<IgetUserAllWords | null> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return response.ok ? response.json() : null;
}

export async function UpdateWordsUserApi({ id, idWord, token, body }: IapiWords): Promise<IgetUserAllWords | null> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return response.ok ? response.json() : null;
}

export async function deleteordsUserApi(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response.ok ? response : null;
}

import { baseUrl, headers, path } from './basicApi';
import { IapiWords, IgetUserAllWords } from '../types/interface';

export async function getUserAllWords(id: string, token: string): Promise<IgetUserAllWords[]> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words`, {
    method: 'GET',
    headers: headers(token)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

export async function getUserIdWords(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'GET',
    headers: headers(token)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

export async function addWordsUserApi({ id, idWord, token, body }: IapiWords): Promise<IgetUserAllWords> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'POST',
    headers: headers(token),

    body: JSON.stringify(body)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

export async function UpdateWordsUserApi({ id, idWord, token, body }: IapiWords): Promise<IgetUserAllWords> {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'PUT',
    headers: headers(token),

    body: JSON.stringify(body)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

export async function deletewordsUserApi(id: string, idWord: string, token: string) {
  const response = await fetch(`${baseUrl}${path.users}/${id}/words/${idWord}`, {
    method: 'DELETE',
    headers: headers(token)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

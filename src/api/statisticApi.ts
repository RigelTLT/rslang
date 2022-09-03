import { IstatisticBody } from '../types/interface';
import { baseUrl, path } from './basicApi';

export async function getStatistic(userId: string, token: string) {
  const response = await fetch(`${baseUrl}users/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return response.ok ? response.json() : null;
}
export async function putStatistic(
  userId: string,
  token: string,
  body: IstatisticBody
): Promise<IstatisticBody | null> {
  const response = await fetch(`${baseUrl}users/${userId}/statistics`, {
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

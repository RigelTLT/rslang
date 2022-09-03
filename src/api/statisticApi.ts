import { Istatistic } from '../types/interface';
import { baseUrl } from './basicApi';

export async function getStatistic(userId: string, token: string): Promise<Istatistic> {
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

export async function putStatistic(userId: string, token: string, body: Istatistic): Promise<Istatistic | null> {
  const response = await fetch(`${baseUrl}users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  console.log(response.json());

  return response.ok ? response.json() : null;
}

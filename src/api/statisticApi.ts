import { Istatistic, IstatisticResponse } from '../types/interface';
import { baseUrl, path } from './basicApi';

export async function getStatistic(userId: string, token: string): Promise<IstatisticResponse> {
  const response = await fetch(`${baseUrl}${path.users}/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((data) => data.json())
    .catch((err: Error) => alert(err.message));

  return response;
}

export async function putStatistic(userId: string, token: string, body: Istatistic): Promise<Istatistic> {
  const response = await fetch(`${baseUrl}${path.users}/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((data) => data.json())
    .catch((err: Error) => alert(err.message));

  return response;
}

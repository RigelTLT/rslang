import { Istatistic, IstatisticResponse } from '../types/interface';
import { baseUrl, headers, path } from './basicApi';

export async function getStatistic(userId: string, token: string): Promise<IstatisticResponse> {
  const response = await fetch(`${baseUrl}${path.users}/${userId}/statistics`, {
    method: 'GET',
    headers: headers(token)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

export async function putStatistic(userId: string, token: string, body: Istatistic): Promise<Istatistic> {
  const response = await fetch(`${baseUrl}${path.users}/${userId}/statistics`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(body)
  })
    .then((data) => data.json())
    .catch((err: Error) => console.log(err.message));

  return response;
}

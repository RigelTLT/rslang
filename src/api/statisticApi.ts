import { Istatistic, IstatisticResponse } from '../types/interface';
import { baseUrl } from './basicApi';

export async function getStatistic(userId: string, token: string): Promise<IstatisticResponse> {
  const response = await fetch(`${baseUrl}users/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 401) throw new Error('Пользователь не авторизова');

      return res;
    })
    .then((data) => data.json());
  // .catch((err: Error) => {
  //   throw new Error('Произошла ошибка, попробуйте снова');
  // });

  return response;
}

export async function putStatistic(userId: string, token: string, body: Istatistic): Promise<Istatistic> {
  const response = await fetch(`${baseUrl}users/${userId}/statistics`, {
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

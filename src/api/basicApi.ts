import { IapiRequestWords, ILibraryResponse } from '../types/interface';

export const baseUrl = 'https://react-learnwords-2022.herokuapp.com/';
export const path = {
  words: 'words',
  users: 'users',
  aggregatedWords: 'aggregatedWords',
  statistics: 'statistics',
  settings: 'settings',
  signin: 'signin',
  tokens: 'tokens'
};

export const headers = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
};

export async function getWords(query: IapiRequestWords): Promise<ILibraryResponse[]> {
  const response = await fetch(`${baseUrl}${path.words}?group=${query.group}&page=${query.page}`);
  const data = await response.json();
  return data;
}
export async function getWordId(id: string): Promise<ILibraryResponse> {
  const response = await fetch(`${baseUrl}${path.words}/${id}`);
  const data = await response.json();
  return data;
}

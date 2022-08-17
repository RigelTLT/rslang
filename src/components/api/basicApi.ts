import { IapiRequestWords } from './../interface/interface';

export const baseUrl = 'https://react-learnwords-2022.herokuapp.com/';
export const path = {
  words: 'words',
  users: 'users',
  aggregatedWords: 'aggregatedWords',
  statistics: 'statistics',
  settings: 'settings',
  signin: 'signin',
  tokens: 'tokens',
};

export async function getWords(query: IapiRequestWords) {
  const response = await fetch(`${baseUrl}${path.words}?group=${query.group}&page=${query.page}`);
  const data = await response.json();
  return data;
}
export async function getWordId(id: string) {
  const response = await fetch(`${baseUrl}${path.words}/${id}`);
  const data = await response.json();
  return data;
}
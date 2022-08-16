import { IapiRequestWords } from './../interface/interface';

export const baseUrl = 'https://react-learnwords-2022.herokuapp.com/';
export const path = {
  words: 'words',
  users: 'users',
  aggregatedWords: 'aggregatedWords',
  statistics: 'statistics',
  settings: 'settings',
};

export async function getWords(query?: IapiRequestWords) {
  let params = {
    group: '',
    page: ''
  };
  if(query){
    params = query;
  }
  const response = await fetch(`${baseUrl}${path.words}?group=${params.group}&page=${params.page}`);
  const data = await response.json();
  return data;
}
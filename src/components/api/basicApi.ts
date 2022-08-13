export const baseUrl = 'https://react-learnwords-2022.herokuapp.com/';
export const path = {
  words: 'words',
  users: 'users',
  aggregatedWords: 'aggregatedWords',
  statistics: 'statistics',
  settings: 'settings',
};
export async function getWords(params?: string) {
  const response = await fetch(`${baseUrl}${path.words}`);
  const data = await response.json();
  console.log(data);
  return data;
}
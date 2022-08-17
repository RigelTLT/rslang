import { getWords } from './../api/basicApi';
import { IapiRequestWords } from './../interface/interface';

export function getPageGroupTextbook() {
  const params = new  URLSearchParams(document.location.search);
  const page =  params.get('page') as string;
  const group =  params.get('group') as string;
  let data: IapiRequestWords;
  if (page && group) {
    data = {page: page, group: group};
  }
  else{
    data = {page: '1', group: '1'};
  }
  createList(data);
}
getPageGroupTextbook();

export async function createList(data: IapiRequestWords){
  const words = await getWords(data);
  console.log(words);
}
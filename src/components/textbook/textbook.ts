import './textbook.scss';
import { baseUrl } from './../api/basicApi';
import { getWords, getWordId } from './../api/basicApi';
import { IapiRequestWords } from './../interface/interface';

function paginationState(page : string, group : string){
  const textGroup = document.querySelector('.text-group') as HTMLElement;
  textGroup.innerHTML = `Раздел ${group}`
  const numberToPage = Number(page);
  const numberPage = document.querySelector('.number-page') as HTMLElement;
  if(page){
    numberPage.innerHTML = page;
  }
  else{
    numberPage.innerHTML = '1';
  }
  const backAll = document.querySelector('.back-all') as HTMLInputElement;
  const back = document.querySelector('.back') as HTMLInputElement;  
  const forward = document.querySelector('.forward') as HTMLInputElement;
  const forwardAll = document.querySelector('.forward-all') as HTMLInputElement;
  if(1 < numberToPage && numberToPage < 30){
    backAll.disabled = false;
    back.disabled = false;
    forward.disabled = false;
    forwardAll.disabled = false;
  }
  if(numberToPage <= 1){
    backAll.disabled = true;
    back.disabled = true;
    forward.disabled = false;
    forwardAll.disabled = false;
  }
  if(numberToPage >= 30){
    backAll.disabled = false;
    back.disabled = false;
    forward.disabled = true;
    forwardAll.disabled = true;
  }
}

function getPageGroupTextbook() {
  const params = new  URLSearchParams(document.location.search);
  const page =  params.get('page') as string;
  const group =  params.get('group') as string;
  paginationState(page, group);
  const audioCallLink = document.querySelector('.link__audio-call') as HTMLLinkElement;
  const sprint = document.querySelector('.link__sprint') as HTMLLinkElement;
  audioCallLink.href = `./audio-call.html?group=${group}&page=${page}`;
  sprint.href = `./sprint.html?group=${group}&page=${page}`;
  let data: IapiRequestWords;
  if (page && group) {
    data = {page: `${Number(page)-1}`, group: `${Number(group)-1}`};
  }
  else{
    data = {page: '0', group: '0'};
  }
  createList(data);
}
if(window.location.pathname === '/ebook.html'){
getPageGroupTextbook();
}

async function createList(data: IapiRequestWords){
  const words = await getWords(data);
  
  const main = document.querySelector('.main') as HTMLElement;
  const list = document.createElement('div');
  list.classList.add('list-textbook');
  main.append(list);
  for (let i = 0; i < words.length; i++) {
    const elem = document.createElement('div');
    elem.classList.add('list-textbook__elem');
    list.append(elem);
    const img = document.createElement('img');
    img.classList.add('list-textbook__elem__img');
    img.src = `${baseUrl}${words[i].image}`;
    elem.append(img);
    const wordsContainer = document.createElement('div');
    wordsContainer.classList.add('list-textbook__elem__words-container');
    elem.append(wordsContainer);
    const wordContainer = document.createElement('div');
    wordContainer.classList.add('list-textbook__elem__word-container');
    wordsContainer.append(wordContainer);
    const word = document.createElement('div');
    word.classList.add('word-container__word');
    word.innerHTML = `${words[i].word}`;
    wordContainer.append(word);
    const transcription = document.createElement('div');
    transcription.classList.add('word-container__transcription');
    transcription.innerHTML = `${words[i].transcription}`;
    wordContainer.append(transcription);
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    imgAudio = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgElem.classList.add('word-audio');
    svgElem.setAttribute('data-id', `${words[i].id}`);
    imgAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
    svgElem.append(imgAudio);
    wordContainer.append(svgElem);
    const wordTranslate = document.createElement('div');
    wordTranslate.classList.add('word-container__wordTranslate');
    wordTranslate.innerHTML = `${words[i].wordTranslate}`;
    wordContainer.append(wordTranslate);
    const example = document.createElement('div');
    example.classList.add('list-textbook__elem__example');
    wordsContainer.append(example);
    const svgExample = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    imgAudioExample = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgExample.classList.add('example-audio');
    svgExample.setAttribute('data-id', `${words[i].id}`);
    imgAudioExample.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
    svgExample.append(imgAudioExample);
    example.append(svgExample);
    const textExample = document.createElement('div');
    textExample.classList.add('example__text');
    textExample.innerHTML = `${words[i].textExample}`;
    example.append(textExample);
    const textExampleTranslate = document.createElement('div');
    textExampleTranslate.classList.add('example__textTranslate');
    textExampleTranslate.innerHTML = `${words[i].textExampleTranslate}`;
    example.append(textExampleTranslate);
    const meaning = document.createElement('div');
    meaning.classList.add('list-textbook__elem__meaning');
    wordsContainer.append(meaning);
    const svgMeaning = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    imgAudioMeaning = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgMeaning.classList.add('meaning-audio');
    svgMeaning.setAttribute('data-id', `${words[i].id}`);
    imgAudioMeaning.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
    svgMeaning.append(imgAudioMeaning);
    meaning.append(svgMeaning);
    const textMeaning = document.createElement('div');
    textMeaning.classList.add('meaning__text');
    textMeaning.innerHTML = `${words[i].textMeaning}`;
    meaning.append(textMeaning);
    const textMeaningTranslate = document.createElement('div');
    textMeaningTranslate.classList.add('meaning__textTranslate');
    textMeaningTranslate.innerHTML = `${words[i].textMeaningTranslate}`;
    meaning.append(textMeaningTranslate);
  }
}

export async function sound(id: string, targetAudio: string, classTarget: string){
  const query = await getWordId(id);
  const picture = document.querySelector(`${classTarget}[data-id="${id}"]`) as HTMLElement;
  const pictureAudio = picture.firstChild  as HTMLElement;
  pictureAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-play.svg#Capa_1');
  const audio = new Audio();
  audio.src = `${baseUrl}${query[targetAudio]}`;
  audio.autoplay = true;
  audio.addEventListener('ended', function() {
    pictureAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
 });
}

export function changePage(button: string){
  const params = new  URLSearchParams(document.location.search);
  let page =  params.get('page') as string;
  let group =  params.get('group') as string;
  if (!page && !group) {
    page = '1';
    group = '1';
  }
  const numberToPage = Number(page);
  let newPage: number;;
  const url = `${document.location.origin}${document.location.pathname}`;
  if(button ==='back-all'){
    newPage = 1;
    window.location.href = `${url}?group=${group}&page=${newPage}`;
  }
  if(button ==='back'){
    if(numberToPage <= 1){
    newPage = 1;
    window.location.href = `${url}?group=${group}&page=${newPage}`;
  }else{
    newPage = numberToPage-1;
    window.location.href = `${url}?group=${group}&page=${newPage}`;
  }
  }
  if(button ==='forward'){
    if(numberToPage >= 30){
      newPage = 30;
      window.location.href = `${url}?group=${group}&page=${newPage}`;
    }else{
      newPage = numberToPage+1;
      window.location.href = `${url}?group=${group}&page=${newPage}`;
    }
  }
  if(button ==='forward-all'){
    newPage = 30;
    window.location.href = `${url}?group=${group}&page=${newPage}`;
  }
}
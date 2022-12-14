import './textbook.scss';
import { addWordsUserApi, getUserIdWords, UpdateWordsUserApi, getUserAllWords } from '../../api/wordsApi';
import { baseUrl, getWords, getWordId } from '../../api/basicApi';
import { IapiRequestWords } from '../../types/interface';
import { GetLocalStorageToken } from './../authorization/auth';

export function cheakPageToComplete() {
  const words = document.querySelectorAll('.list-textbook__elem');
  let index = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].classList.contains('hard') || words[i].classList.contains('studied')) {
      index++;
    }
  }
  const main = document.querySelector('.main') as HTMLElement;
  const numberPage = document.querySelector('.number-page') as HTMLElement;
  if (index == words.length) {
    main.classList.add('studied-page');
    numberPage.classList.add('pagination-studied');
  } else {
    if (numberPage.classList.contains('pagination-studied') && main.classList.contains('studied-page')) {
      main.classList.remove('studied-page');
      numberPage.classList.remove('pagination-studied');
    }
  }
}

export async function addCompoundWord(id: string, idWord: string, token: string) {
  const cheak = await getUserIdWords(id, idWord, token);
  const body = { difficulty: 'hard', optional: {} };
  if (!cheak) {
    await addWordsUserApi({ id, idWord, token, body });
  } else {
    await UpdateWordsUserApi({ id, idWord, token, body });
  }
  cheakPageToComplete();
}

export async function studiedCompoundWord(id: string, idWord: string, token: string) {
  const cheak = await getUserIdWords(id, idWord, token);
  const body = { difficulty: 'studied', optional: {} };
  if (!cheak) {
    await addWordsUserApi({ id, idWord, token, body });
  } else {
    await UpdateWordsUserApi({ id, idWord, token, body });
  }
  cheakPageToComplete();
  //TODO добавление в статистику
}

function paginationState(page: string, group: string) {
  const textGroup = document.querySelector('.text-group') as HTMLElement;
  textGroup.innerText = page ? `Раздел ${group}` : 'Раздел 1';

  const numberPage = document.querySelector('.number-page') as HTMLElement;
  numberPage.innerText = page ? page : '1';

  const backAll = document.querySelector('.back-all') as HTMLInputElement;
  const back = document.querySelector('.back') as HTMLInputElement;
  const forward = document.querySelector('.forward') as HTMLInputElement;
  const forwardAll = document.querySelector('.forward-all') as HTMLInputElement;

  const numberToPage = Number(page);

  if (1 < numberToPage && numberToPage < 30) {
    backAll.disabled = false;
    back.disabled = false;
    forward.disabled = false;
    forwardAll.disabled = false;
  }
  if (numberToPage <= 1) {
    backAll.disabled = true;
    back.disabled = true;
    forward.disabled = false;
    forwardAll.disabled = false;
  }
  if (numberToPage >= 30) {
    backAll.disabled = false;
    back.disabled = false;
    forward.disabled = true;
    forwardAll.disabled = true;
  }
}

export function getPageGroupTextbook() {
  const params = new URLSearchParams(document.location.search);
  const page = params.get('page') as string;
  const group = params.get('group') as string;
  paginationState(page, group);
  const audioCallLink = document.querySelector('.link__audio-call') as HTMLLinkElement;
  const sprint = document.querySelector('.link__sprint') as HTMLLinkElement;

  let data: IapiRequestWords;
  if (page && group) {
    data = { page: `${Number(page) - 1}`, group: `${Number(group) - 1}` };
    audioCallLink.href = `./audio-call.html?group=${group}&page=${page}`;
    sprint.href = `./sprint.html?group=${group}&page=${page}`;
  } else {
    data = { page: '0', group: '0' };
    audioCallLink.href = `./audio-call.html?group=1&page=1`;
    sprint.href = `./sprint.html?group=1&page=1`;
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  createList(data);
}

export async function checkWordsUser(id: string, token: string) {
  return id && token ? getUserAllWords(id, token) : null;
}

async function createList(data: IapiRequestWords) {
  const words = await getWords(data);
  const localStorage = new GetLocalStorageToken();
  const checkWords = await checkWordsUser(localStorage.id, localStorage.token);
  const list = document.querySelector('.list-textbook') as HTMLElement;
  const container = document.createElement('div') as HTMLElement;
  container.classList.add('container');
  list.append(container);

  for (let i = 0; i < words.length; i++) {
    const elem = document.createElement('div');
    elem.classList.add('list-textbook__elem');
    elem.setAttribute('data-id', `${words[i].id}`);
    container.append(elem);

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
    word.innerText = `${words[i].word}`;
    wordContainer.append(word);

    const transcription = document.createElement('div');
    transcription.classList.add('word-container__transcription');
    transcription.innerText = `${words[i].transcription}`;
    wordContainer.append(transcription);

    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const imgAudio = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    svgElem.classList.add('audio');
    svgElem.setAttribute('data-id', `${words[i].id}`);
    imgAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
    svgElem.append(imgAudio);
    wordContainer.append(svgElem);

    const wordTranslate = document.createElement('div');
    wordTranslate.classList.add('word-container__wordTranslate');
    wordTranslate.innerText = `${words[i].wordTranslate}`;
    wordContainer.append(wordTranslate);

    const example = document.createElement('div');
    example.classList.add('list-textbook__elem__example');
    wordsContainer.append(example);

    const textExample = document.createElement('div');
    textExample.classList.add('example__text');
    textExample.innerText = `${words[i].textExample}`;
    example.append(textExample);

    const textExampleTranslate = document.createElement('div');
    textExampleTranslate.classList.add('example__textTranslate');
    textExampleTranslate.innerText = `${words[i].textExampleTranslate}`;
    example.append(textExampleTranslate);

    const meaning = document.createElement('div');
    meaning.classList.add('list-textbook__elem__meaning');
    wordsContainer.append(meaning);

    const textMeaning = document.createElement('div');
    textMeaning.classList.add('meaning__text');
    textMeaning.innerText = `${words[i].textMeaning}`;
    meaning.append(textMeaning);

    const textMeaningTranslate = document.createElement('div');
    textMeaningTranslate.classList.add('meaning__textTranslate');
    textMeaningTranslate.innerText = `${words[i].textMeaningTranslate}`;
    meaning.append(textMeaningTranslate);

    if (localStorage.id) {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('list-textbook__cont-button');
      elem.append(buttonContainer);

      const buttonAdd = document.createElement('button');
      buttonAdd.classList.add('cont-button');
      buttonAdd.classList.add('cont-button__add');
      buttonAdd.innerText = `Добавить в сложные слова`;
      buttonContainer.append(buttonAdd);

      const buttonRemove = document.createElement('button');
      buttonRemove.classList.add('cont-button');
      buttonRemove.classList.add('cont-button__remove');
      buttonRemove.innerText = `Убрать из сложных слов`;
      buttonRemove.disabled = true;
      buttonContainer.append(buttonRemove);

      const buttonComplete = document.createElement('button');
      buttonComplete.classList.add('cont-button');
      buttonComplete.classList.add('cont-button__studied');
      buttonComplete.innerText = `Изученно`;
      buttonContainer.append(buttonComplete);

      if (!checkWords) return;

      for (let j = 0; j < checkWords.length; j++) {
        if (checkWords[j].wordId === words[i].id) {
          if (checkWords[j].difficulty === 'hard') {
            elem.classList.add('hard');
            buttonAdd.disabled = true;
            buttonRemove.disabled = false;
          }

          if (checkWords[j].difficulty === 'studied') {
            elem.classList.add('studied');
            buttonAdd.disabled = true;
            buttonRemove.disabled = true;
            buttonComplete.disabled = true;
          }
        }
      }
    }
  }
  cheakPageToComplete();
}

export async function sound(id: string) {
  const query = await getWordId(id);
  const arrayAudio: ('audio' | 'audioExample' | 'audioMeaning')[] = ['audio', 'audioExample', 'audioMeaning'];
  const picture = document.querySelector(`svg[data-id="${id}"]`) as HTMLElement;
  const pictureAudio = picture.firstChild as HTMLElement;
  pictureAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-play.svg#Capa_1');
  const audio = new Audio();
  audio.src = `${baseUrl}${query[arrayAudio[0]]}`;
  audio.autoplay = true;
  //TODO удалить EventListner
  let i = 0;
  audio.onended = function () {
    i++;
    if (i < arrayAudio.length) {
      audio.src = `${baseUrl}${query[arrayAudio[i]]}`;
      audio.play();
    } else {
      pictureAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
      //TODO добавить EventListner
    }
  };
}

export function changePage(button: 'back-all' | 'back' | 'forward' | 'forward-all') {
  const params = new URLSearchParams(document.location.search);
  let page = params.get('page') as string;
  let group = params.get('group') as string;

  if (!page && !group) {
    page = '1';
    group = '1';
  }

  const numberToPage = Number(page);

  let newPage: number | undefined;

  const url = `${document.location.origin}${document.location.pathname}`;

  if (button === 'back-all') newPage = 1;

  if (button === 'back') {
    if (numberToPage <= 1) newPage = 1;
    else newPage = numberToPage - 1;
  }
  if (button === 'forward') {
    if (numberToPage >= 30) newPage = 30;
    else newPage = numberToPage + 1;
  }
  if (button === 'forward-all') newPage = 30;

  window.location.href = `${url}?group=${group}&page=${newPage ? newPage : 1}`;
}

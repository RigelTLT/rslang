import './textbook.scss';
import { baseUrl, getWordId } from '../../api/basicApi';
import { deleteordsUserApi } from '../../api/wordsApi';
import { IapiRequestUserWords } from '../../types/interface';
import { GetLocalStorageToken } from './../authorization/auth';
import { checkWordsUser } from './textbook';

function paginationState(group: string, status: string) {
  const textGroup = document.querySelectorAll('.text-group');
  if (status) {
    if (status === 'studied') {
      textGroup[0].innerHTML = `Изученные слова`;
      const linkСhapters = document.querySelectorAll('.link__chapter');
      linkСhapters.forEach((chapter) => ((chapter as HTMLLinkElement).href += '&status=studied'));
    } else {
      textGroup[0].innerHTML = 'Сложные слова';
    }
  } else {
    textGroup[0].innerHTML = `Сложные слова`;
  }
  if (group) {
    textGroup[1].innerHTML = `Раздел ${group}`;
    const linksStatus = document.querySelectorAll('.link__status');
    linksStatus.forEach((link) => ((link as HTMLLinkElement).href += `&group=${group}`));
  } else {
    textGroup[1].innerHTML = `Раздел 1`;
  }
}

function getPageGroupTextbook() {
  const params = new URLSearchParams(document.location.search);
  const group = params.get('group') as string;
  const status = params.get('status') as string;
  paginationState(group, status);
  const data = {
    group: `${group ? Number(group) - 1 : '0'}`,
    status: `${status ? status : 'hard'}`
  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  createList(data);
}

if (window.location.pathname === '/dictionary.html') getPageGroupTextbook();

export async function removeCompoundWord(id: string, idWord: string, token: string) {
  await deleteordsUserApi(id, idWord, token);
  const picture = document.querySelector(`div[data-id="${idWord}"]`) as HTMLElement;
  picture.remove();
}

async function createList(data: IapiRequestUserWords) {
  const localStorage = new GetLocalStorageToken();
  const checkWords = await checkWordsUser(localStorage.id, localStorage.token);
  const list = document.querySelector('.list-textbook') as HTMLElement;

  if (localStorage.token) {
    for (let i = 0; i < checkWords.length; i++) {
      const words = await getWordId(checkWords[i].wordId);
      if (data.status === checkWords[i].difficulty && Number(data.group) === words.group) {
        const elem = document.createElement('div');
        elem.classList.add('list-textbook__elem');
        elem.setAttribute('data-id', `${words.id}`);
        list.append(elem);

        const img = document.createElement('img');
        img.classList.add('list-textbook__elem__img');
        img.src = `${baseUrl}${words.image}`;
        elem.append(img);

        const wordsContainer = document.createElement('div');
        wordsContainer.classList.add('list-textbook__elem__words-container');
        elem.append(wordsContainer);

        const wordContainer = document.createElement('div');
        wordContainer.classList.add('list-textbook__elem__word-container');
        wordsContainer.append(wordContainer);

        const word = document.createElement('div');
        word.classList.add('word-container__word');
        word.innerHTML = `${words.word}`;
        wordContainer.append(word);

        const transcription = document.createElement('div');
        transcription.classList.add('word-container__transcription');
        transcription.innerHTML = `${words.transcription}`;
        wordContainer.append(transcription);

        const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const imgAudio = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        svgElem.classList.add('audio');
        svgElem.setAttribute('data-id', `${words.id}`);
        imgAudio.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/ico/audio-mute.svg#Capa_1');
        svgElem.append(imgAudio);
        wordContainer.append(svgElem);

        const wordTranslate = document.createElement('div');
        wordTranslate.classList.add('word-container__wordTranslate');
        wordTranslate.innerHTML = `${words.wordTranslate}`;
        wordContainer.append(wordTranslate);

        const example = document.createElement('div');
        example.classList.add('list-textbook__elem__example');
        wordsContainer.append(example);

        const textExample = document.createElement('div');
        textExample.classList.add('example__text');
        textExample.innerHTML = `${words.textExample}`;
        example.append(textExample);

        const textExampleTranslate = document.createElement('div');
        textExampleTranslate.classList.add('example__textTranslate');
        textExampleTranslate.innerHTML = `${words.textExampleTranslate}`;
        example.append(textExampleTranslate);

        const meaning = document.createElement('div');
        meaning.classList.add('list-textbook__elem__meaning');
        wordsContainer.append(meaning);

        const textMeaning = document.createElement('div');
        textMeaning.classList.add('meaning__text');
        textMeaning.innerHTML = `${words.textMeaning}`;
        meaning.append(textMeaning);

        const textMeaningTranslate = document.createElement('div');
        textMeaningTranslate.classList.add('meaning__textTranslate');
        textMeaningTranslate.innerHTML = `${words.textMeaningTranslate}`;
        meaning.append(textMeaningTranslate);

        if (data.status === 'hard') {
          const buttonRemove = document.createElement('button');
          buttonRemove.classList.add('cont-button');
          buttonRemove.classList.add('cont-button__remove-to-dictionary');
          buttonRemove.innerText = `Убрать из сложных слов`;
          elem.append(buttonRemove);
        }
      }
    }
  } else {
    list.innerText = `Авторизируйтесь для просмотра и редактирования`;
  }
}

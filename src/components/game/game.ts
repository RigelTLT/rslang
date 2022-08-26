import { getWords } from '../api/basicApi';
import { IapiRequestWords, ILibraryResponse } from '../../types/interface';
import 'select-pure';
import './game.scss';

export default class Game {
  renderTemplate(templateId: string, selector: string): void {
    const template = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
    const container = document.querySelector(`${selector}`) as HTMLElement;
    container.innerHTML = '';
    container.append(template.content.cloneNode(true));
  }

  checkGameName(): 'sprint' | 'audio-call' {
    return document.location.pathname.includes('sprint') ? 'sprint' : 'audio-call';
  }

  checkParameter(): IapiRequestWords | undefined {
    if (document.location.search === '') return undefined;
    const params = new URLSearchParams(document.location.search);
    const page = params.get('page') as string;
    const group = params.get('group') as string;
    return { page, group };
  }

  async createLibrary(): Promise<ILibraryResponse[] | undefined> {
    // const gameName = this.checkGameName();
    const parameterPage = this.checkParameter();
    // const realPageNumber = String(Number(parameterPage?.page) - 1);
    const pageNumber = Number(parameterPage?.page);

    // console.log(parameterPage, 'parameterPage');
    // console.log(realPageNumber, 'gameRealPageName');
    // console.log(pageNumber, 'pageNumber');

    if (pageNumber >= 1 && parameterPage !== undefined) {
      const getWordsLibrary = await getWords(parameterPage);
      return getWordsLibrary;
    }
  }

  gameResult(arrOfTrue: ILibraryResponse[], arrOfFalse: ILibraryResponse[]) {
    const main = document.querySelector('.main') as HTMLElement;

    const section = document.createElement('section');
    section.classList.add('statisctic-game');

    const container = document.createElement('div');
    container.classList.add('container');

    const message = document.createElement('h2');
    message.textContent = arrOfTrue.length < 15 ? 'Неплохо, но есть еще чему поучиться!' : 'Отличный результат!';
    message.classList.add('message');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const learnedWordsContainer = document.createElement('div');
    learnedWordsContainer.classList.add('learned-words');

    const learningWordsContainer = document.createElement('div');
    learningWordsContainer.classList.add('learning-words');

    const learnedHeading = document.createElement('h4');
    learnedHeading.textContent = `Изучено: ${arrOfTrue.length}`;
    learnedHeading.classList.add('heading');

    const learningHeading = document.createElement('h4');
    learningHeading.textContent = `Не изучено: ${arrOfFalse.length}`;
    learningHeading.classList.add('heading');

    const trueWordsContainer = document.createElement('div');
    trueWordsContainer.classList.add('words');

    const trueWordsString = arrOfTrue
      .map(
        (elem) =>
          `<div class='word'>
            <img src='' class='word__audio' alt='word audio image'>
            <span class="word__original">${elem.word}</span>
            -
            <span class="word__translate">${elem.wordTranslate}</span>
          </div>`
      )
      .join(' ');

    trueWordsContainer.innerHTML = `${trueWordsString}`;

    const falseWordsContainer = document.createElement('div');
    falseWordsContainer.classList.add('words');

    const falsewordsString = arrOfFalse
      .map(
        (elem) =>
          `<div class='word'>
            <img src='' class='word__audio' alt='word audio image'>
            <span class="word__original">${elem.word}</span>
            -
            <span class="word__translate">${elem.wordTranslate}</span>
          </div>`
      )
      .join(' ');

    falseWordsContainer.innerHTML = `${falsewordsString}`;

    main.innerHTML = '';
    main.append(section);
    section.append(container);
    container.append(message, contentContainer);
    contentContainer.append(learnedWordsContainer, learningWordsContainer);

    learnedWordsContainer.append(learnedHeading, trueWordsContainer);
    learningWordsContainer.append(learningHeading, falseWordsContainer);
  }
}

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

    if (pageNumber >= 1 && parameterPage !== undefined) {
      const getWordsLibrary = await getWords(parameterPage);
      return getWordsLibrary;
    }
  }

  gameResult(arrOfRight: ILibraryResponse[], arrOfWrong: ILibraryResponse[]) {
    const template = document.querySelector('#statistics') as HTMLTemplateElement;
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    main.append(template.content.cloneNode(true));

    const headingRight = document.querySelector('.heading-right') as HTMLElement;
    headingRight.textContent = `Изучено: ${arrOfRight.length}`;

    const headingWrong = document.querySelector('.heading-wrong') as HTMLElement;
    headingWrong.textContent = `Не изучено: ${arrOfWrong.length}`;

    const message = document.querySelector('.message') as HTMLElement;
    message.textContent = arrOfRight.length < 15 ? 'Неплохо, но есть еще чему поучиться!' : 'Отличный результат!';

    const wordsRightContainer = document.querySelector('.words-right') as HTMLDivElement;
    const wordsWrongContainer = document.querySelector('.words-wrong') as HTMLDivElement;

    const wordsTemplate = (arrName: ILibraryResponse[]) =>
      arrName
        .map(
          (elem) =>
            `<div class='word'>
              <img src='' class='word__audio' alt='word audio image'>
              <span class="word__original">${elem.word}</span>-
              <span class="word__translate">${elem.wordTranslate}</span>
            </div>`
        )
        .join(' ');

    wordsRightContainer.innerHTML = wordsTemplate(arrOfRight);
    wordsWrongContainer.innerHTML = wordsTemplate(arrOfWrong);
  }
}

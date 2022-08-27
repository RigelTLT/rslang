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
    if (arrOfRight.length < 5) {
      message.textContent = 'А репетитора вы можете найти в сервисе <место для вашей рекламы> ';
    } else if (arrOfRight.length < 15) {
      message.textContent = 'Неплохо, но есть еще чему поучиться!';
    } else {
      message.textContent = 'Отличный результат!';
    }

    const wordsRightContainer = document.querySelector('.words-right') as HTMLDivElement;
    const wordsWrongContainer = document.querySelector('.words-wrong') as HTMLDivElement;

    const wordsTemplate = (arrName: ILibraryResponse[]) =>
      arrName
        .map(
          (elem) =>
            `<div class='word'>
              <svg class="audio" data-id="">
                <use xlink:href="assets/ico/audio-play.svg#Capa_1"></use>
              </svg>
              <span class="word__original">${elem.word}</span> -
              <span class="word__translate">${elem.wordTranslate}</span>
            </div>`
        )
        .join(' ');

    wordsRightContainer.innerHTML = wordsTemplate(arrOfRight);
    wordsWrongContainer.innerHTML = wordsTemplate(arrOfWrong);

    const playAgainBtn = document.querySelector('#play-again') as HTMLButtonElement;
    playAgainBtn.addEventListener('click', () => {
      location.replace(location.href);
    });

    const returnToStartBtn = document.querySelector('#to-start') as HTMLButtonElement;
    returnToStartBtn.addEventListener('click', () => {
      location.replace('http://localhost:8080/sprint.html');
    });
  }
}

import { baseUrl, getWordId, getWords } from '../../api/basicApi';
import { IapiRequestWords, ILibraryResponse, IstatisticResponse } from '../../types/interface';
import 'select-pure';
import './game.scss';
import { SelectPure } from 'select-pure/lib/components';
import { getStatistic, putStatistic } from '../../api/statisticApi';
import { GetLocalStorageToken } from '../authorization/auth';

export function playAudio(pathToSrc: string): void {
  const audio = new Audio();
  audio.src = pathToSrc;
  audio.autoplay = true;
}

export default class Game {
  static trueButtonFunc: (event: KeyboardEvent) => void;

  static falseButtonFunc: (event: KeyboardEvent) => void;

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
    const parameterPage = this.checkParameter();
    const pageNumber = Number(parameterPage?.page);

    if (pageNumber >= 1 && parameterPage !== undefined) {
      parameterPage.page = (Number(parameterPage.page) - 1).toString();
      parameterPage.group = (Number(parameterPage.group) - 1).toString();

      return getWords(parameterPage);
    }
  }

  async gameResult(arrOfRight: ILibraryResponse[], arrOfWrong: ILibraryResponse[], longestSeriesRightAnswers: number) {
    if (this.checkGameName() === 'sprint') {
      document.body.removeEventListener('keyup', Game.trueButtonFunc);
      document.body.removeEventListener('keyup', Game.falseButtonFunc);
    }

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
              <svg 
                data-id="${elem.id}" 
                class="illustration__svg" 
                focusable="false" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 
                3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 
                2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 
                3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91
                 7-4.49 7-8.77s-2.99-7.86-7-8.77z">
              </path>
            </svg>
              <span class="word__original">${elem.word}</span> -
              <span class="word__translate">${elem.wordTranslate}</span>
            </div>`
        )
        .join(' ');

    wordsRightContainer.innerHTML = wordsTemplate(arrOfRight);
    wordsWrongContainer.innerHTML = wordsTemplate(arrOfWrong);

    const localStorage = new GetLocalStorageToken();
    const userStatistics = await getStatistic(localStorage.id, localStorage.token);

    const rightAnswersProcent = (arrOfRight.length / (arrOfRight.length + arrOfWrong.length)) * 100;

    if (this.checkGameName() === 'sprint') {
      userStatistics.optional.sprint.correctAnswersPercent = `${rightAnswersProcent}`;
      userStatistics.optional.sprint.learnedWord = [...arrOfRight];
      userStatistics.optional.sprint.longestSeriesCorrect = longestSeriesRightAnswers.toString();
    } else {
      userStatistics.optional.audioCall.correctAnswersPercent = `${rightAnswersProcent}`;
      userStatistics.optional.audioCall.learnedWord = [...arrOfRight];
      userStatistics.optional.audioCall.longestSeriesCorrect = longestSeriesRightAnswers.toString();
    }

    this.sendingResult(localStorage.token, localStorage.id, userStatistics);

    this.gameResultListeners();
  }

  gameResultListeners() {
    const playAgainBtn = document.querySelector('#play-again') as HTMLButtonElement;
    playAgainBtn.addEventListener('click', () => {
      location.replace(location.href);
    });

    const page = this.checkGameName();
    const returnToStartBtn = document.querySelector('#to-start') as HTMLButtonElement;
    returnToStartBtn.addEventListener('click', () => {
      location.replace(`http://localhost:8080/${page}.html`);
    });

    const svgElem = document.querySelectorAll('.illustration__svg') as NodeList;
    svgElem.forEach((svg) => {
      svg.addEventListener('click', async () => {
        const svgId = (svg as HTMLElement).getAttribute('data-id');
        if (!svgId) return alert('id не найден');

        const wordObj: ILibraryResponse = await getWordId(svgId);

        const audioPath = `${baseUrl}${wordObj.audio}`;
        playAudio(audioPath);
      });
    });
  }

  async sendingResult(token: string, id: string, body: IstatisticResponse) {
    delete body.id;
    await putStatistic(id, token, body);
  }

  randomIndexGenerator(maxLength: number, exclude?: number): number {
    let randomNumber = Math.floor(Math.random() * maxLength);

    while (randomNumber === exclude || randomNumber === 0) {
      randomNumber = Math.floor(Math.random() * maxLength);
    }

    return randomNumber;
  }

  menu() {
    const startBtn = document.querySelector('#start-btn') as HTMLButtonElement;
    const page = this.checkGameName();

    let selectedDifficultLevel: string;
    const selectPure = document.querySelector('select-pure') as SelectPure;
    selectPure.addEventListener('change', () => {
      selectedDifficultLevel = selectPure.value;
    });

    startBtn?.addEventListener('click', () => {
      if (selectedDifficultLevel === '') return alert('Сначала выбери уровень сложности');

      const randomPageNumber = this.randomIndexGenerator(30);
      location.replace(`http://localhost:8080/${page}.html?group=${selectedDifficultLevel}&page=${randomPageNumber}`);
    });
  }
}

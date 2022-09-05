import { baseUrl, getWordId, getWords } from '../../api/basicApi';
import { getUserAllWords } from '../../api/wordsApi';
import { IapiRequestWords, ILibraryResponse, Istatistic } from '../../types/interface';
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
      const wordsSheet = await getWords(parameterPage);
      const localStorage = new GetLocalStorageToken();
      const wordsUser = await getUserAllWords(localStorage.id, localStorage.token);
      const listWords = wordsSheet;
      if (!wordsUser) {
        return listWords;
      }
      for (let i = 0; i < wordsSheet.length; i++) {
        for (let j = 0; j < wordsUser.length; j++) {
          if (wordsUser[j].difficulty === 'studied') {
            if (wordsSheet[i].id.includes(wordsUser[j].wordId)) {
              listWords.splice(i, 1);
            }
          }
        }
      }
      if (listWords.length < 20 && pageNumber > 1) {
        parameterPage.page = (Number(parameterPage.page) - 1).toString();
        const wordsSheetPrev = await getWords(parameterPage);
        for (let i = 0; i < wordsSheetPrev.length; i++) {
          for (let j = 0; j < wordsUser.length; j++) {
            if (wordsSheetPrev[i].id.includes(wordsUser[j].wordId) && wordsUser[j].difficulty === 'studied') {
              i++;
            }
            if (listWords.length === 20) {
              return listWords;
            }
          }
          listWords.push(wordsSheetPrev[i]);
        }
      }
      return listWords;
    }
  }

  async gameResult(
    arrOfRightObj: ILibraryResponse[],
    arrOfWrongObj: ILibraryResponse[],
    longestSeriesRightAnswers: number
  ) {
    const arrOfRight = arrOfRightObj.map((el) => el.id);
    const arrOfWrong = arrOfWrongObj.map((el) => el.id);
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
    if (arrOfRight.length / arrOfWrong.length < 1) {
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

    wordsRightContainer.innerHTML = wordsTemplate(arrOfRightObj);
    wordsWrongContainer.innerHTML = wordsTemplate(arrOfWrongObj);

    const localStorage = new GetLocalStorageToken();
    const currDate = new Date();
    if (localStorage.id) {
      const wordStatistics = {
        learnedWords: 0,
        optional: {
          date: `${currDate.getDate()}/${currDate.getMonth()}`,
          sprint: { learnedWord: [], correctAnswersPercent: [], longestSeriesCorrect: 0 },
          audioCall: { learnedWord: [], correctAnswersPercent: [], longestSeriesCorrect: 0 },
          textBook: { learnedWord: [], numberOfWordsLearned: 0, percentageOfCorrectAnswers: '' }
        }
      } as Istatistic;
      const rightAnswersProcent = (arrOfRight.length / (arrOfRight.length + arrOfWrong.length)) * 100;
      const prevStatistic = await getStatistic(localStorage.id, localStorage.token);
      if (!prevStatistic) {
        if (this.checkGameName() === 'sprint') {
          wordStatistics.optional.sprint.correctAnswersPercent = [rightAnswersProcent];
          wordStatistics.optional.sprint.learnedWord = [...arrOfRight];
          wordStatistics.optional.sprint.longestSeriesCorrect = longestSeriesRightAnswers;
        } else {
          wordStatistics.optional.audioCall.correctAnswersPercent = [rightAnswersProcent];
          wordStatistics.optional.audioCall.learnedWord = [...arrOfRight];
          wordStatistics.optional.audioCall.longestSeriesCorrect = longestSeriesRightAnswers;
        }
      } else {
        if (this.checkGameName() === 'sprint') {
          const correctAnswersPercent = prevStatistic.optional.sprint.correctAnswersPercent;
          correctAnswersPercent.push(rightAnswersProcent);
          wordStatistics.optional.sprint.correctAnswersPercent = correctAnswersPercent;
          const correctLearnedWord = prevStatistic.optional.sprint.learnedWord;
          correctLearnedWord.push(...arrOfRight);
          for (let i = 0; i < correctLearnedWord.length; i++) {
            correctLearnedWord.filter((el) => el !== correctLearnedWord[i]);
          }
          wordStatistics.optional.sprint.learnedWord = correctLearnedWord;
          const longestPrev = Number(prevStatistic.optional.sprint.longestSeriesCorrect);
          wordStatistics.optional.sprint.longestSeriesCorrect =
            longestSeriesRightAnswers > longestPrev ? longestSeriesRightAnswers : longestPrev;
        } else {
          const correctAnswersPercent = prevStatistic.optional.audioCall.correctAnswersPercent;
          correctAnswersPercent.push(rightAnswersProcent);
          wordStatistics.optional.audioCall.correctAnswersPercent = correctAnswersPercent;
          const correctLearnedWord = prevStatistic.optional.audioCall.learnedWord;
          correctLearnedWord.push(...arrOfRight);
          for (let i = 0; i < correctLearnedWord.length; i++) {
            correctLearnedWord.filter((el) => el !== correctLearnedWord[i]);
          }
          wordStatistics.optional.audioCall.learnedWord = correctLearnedWord;
          const longestPrev = Number(prevStatistic.optional.audioCall.longestSeriesCorrect);
          wordStatistics.optional.audioCall.longestSeriesCorrect =
            longestSeriesRightAnswers > longestPrev ? longestSeriesRightAnswers : longestPrev;
        }
      }
      this.sendingResult(localStorage.token, localStorage.id, wordStatistics);
    }
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
      location.replace(`${location.origin}/${page}.html`);
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

  async sendingResult(token: string, id: string, body: Istatistic) {
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
      if (startBtn.disabled === true) startBtn.disabled = false;
    });

    startBtn?.addEventListener('click', () => {
      if (selectedDifficultLevel === '') return (startBtn.disabled = true);

      const randomPageNumber = this.randomIndexGenerator(30);
      location.replace(`${location.origin}/${page}.html?group=${selectedDifficultLevel}&page=${randomPageNumber}`);
    });
  }
}

import './statistic.scss';
import { getStatistic } from '../../api/statisticApi';
import { GetLocalStorageToken } from '../authorization/auth';
import { IstatisticBody } from '../../types/interface';

export class Statistic {
  async start() {
    const localStorage = new GetLocalStorageToken();

    if (localStorage.id) {
      const { optional } = await getStatistic(localStorage.id, localStorage.token);
      const sprintElem = document.querySelector('.sprint') as HTMLElement;
      const audioCallElem = document.querySelector('.audio-call') as HTMLElement;
      this.fillHTML(sprintElem, audioCallElem, optional);
    } else {
      const gameStatistic = document.querySelector('.game-statistic') as HTMLElement;

      const authorize = document.createElement('h3');
      authorize.classList.add('authorize');
      authorize.textContent = 'Чтобы увидеть раздел статистики необходимо войти в свой аккаунт';
      gameStatistic.innerHTML = '';

      gameStatistic?.append(authorize);
    }
  }

  fillHTML(sprintElem: HTMLElement, audioCallElem: HTMLElement, optional: IstatisticBody) {
    const { audioCall, sprint } = optional;

    const sprintNewCount = sprintElem?.querySelector('.new-word span') as HTMLElement;
    const sprintNewProcent = sprintElem?.querySelector('.percent-currect span') as HTMLElement;
    const sprintLongestCountRight = sprintElem?.querySelector('.longest-series span') as HTMLElement;

    sprintNewCount.textContent = sprint.learnedWord.length.toString();
    sprintNewProcent.textContent = `${Number(sprint.correctAnswersPercent).toFixed(1)} %`;
    sprintLongestCountRight.textContent = sprint.longestSeriesCorrect;

    const audioCallNewCount = audioCallElem?.querySelector('.new-word span') as HTMLElement;
    const audioCallNewProcent = audioCallElem?.querySelector('.percent-currect span') as HTMLElement;
    const audioCallLongestCountRight = audioCallElem?.querySelector('.longest-series span') as HTMLElement;

    audioCallNewCount.textContent = audioCall.learnedWord.length.toString();
    audioCallNewProcent.textContent = `${Number(audioCall.correctAnswersPercent).toFixed(1)} %`;
    audioCallLongestCountRight.textContent = audioCall.longestSeriesCorrect;
  }
}

new Statistic().start();

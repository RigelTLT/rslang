import './statistic.scss';
import { getStatistic } from '../../api/statisticApi';
import { GetLocalStorageToken } from '../authorization/auth';
import { IstatisticBody } from '../../types/interface';

class Statistic {
  async start() {
    const localStorage = new GetLocalStorageToken();

    const { optional } = await getStatistic(localStorage.id, localStorage.token);

    const sprintElem = document.querySelector('.sprint') as HTMLElement;
    const audioCallElem = document.querySelector('.audio-call') as HTMLElement;

    this.fillHTML(sprintElem, audioCallElem, optional);
  }

  fillHTML(sprintElem: HTMLElement, audioCallElem: HTMLElement, optional: IstatisticBody) {
    const { audioCall, sprint } = optional;

    const sprintNewCount = sprintElem?.querySelector('.new-word span') as HTMLElement;
    const sprintNewProcent = sprintElem?.querySelector('.percent-currect span') as HTMLElement;
    const sprintLongestCountRight = sprintElem?.querySelector('.longest-series span') as HTMLElement;

    sprintNewCount.textContent = sprint.learnedWord.length.toString();
    sprintNewProcent.textContent = sprint.correctAnswersPercent;
    sprintLongestCountRight.textContent = sprint.longestSeriesCorrect;

    const audioCallNewCount = audioCallElem?.querySelector('.new-word span') as HTMLElement;
    const audioCallNewProcent = audioCallElem?.querySelector('.percent-currect span') as HTMLElement;
    const audioCallLongestCountRight = audioCallElem?.querySelector('.longest-series span') as HTMLElement;

    audioCallNewCount.textContent = audioCall.learnedWord.length.toString();
    audioCallNewProcent.textContent = audioCall.correctAnswersPercent;
    audioCallLongestCountRight.textContent = audioCall.longestSeriesCorrect;
  }
}

new Statistic().start();

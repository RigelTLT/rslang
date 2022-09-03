import './style.scss';
import { ulListenner } from './components/uiListener/uiListener';
import { GetLocalStorageToken, authorization } from './components/authorization/auth';
import { getStatistic, putStatistic } from './api/statisticApi';

document.addEventListener('DOMContentLoaded', async function () {
  const localStorage = new GetLocalStorageToken();
  if (localStorage.id) {
    const params = { id: localStorage.id, token: localStorage.token, name: localStorage.name };
    authorization(params);
  }

  const userStatistics = await getStatistic(localStorage.id, localStorage.token);
  try {
    if (!userStatistics.id) {
      const currDate = new Date();
      const emptyStatistics = {
        learnedWords: 0,
        optional: {
          date: `${currDate.getDate()}/${currDate.getMonth()}`,
          sprint: { learnedWord: [], correctAnswersPercent: '', longestSeriesCorrect: '' },
          audioCall: { learnedWord: [], correctAnswersPercent: '', longestSeriesCorrect: '' },
          textBook: { learnedWord: [], numberOfWordsLearned: 0, percentageOfCorrectAnswers: '' }
        }
      };

      putStatistic(localStorage.id, localStorage.token, emptyStatistics);
    }
  } catch (error) {
    alert(error);
  }
  ulListenner();
});

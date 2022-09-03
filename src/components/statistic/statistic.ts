import './statistic.scss';
import Game from '../game/game';
import { getStatistic } from '../../api/statisticApi';
import { GetLocalStorageToken } from '../authorization/auth';

class Statistic {
  async start() {
    const localStorage = new GetLocalStorageToken();
    const game = new Game();
    console.log(await getStatistic(localStorage.id, localStorage.token));

    // const gamePapametr = game.checkParameter();
  }
}

new Statistic().start();

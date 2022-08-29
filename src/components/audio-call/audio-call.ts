import Game from '../game/game';
import { ILibraryResponse } from '../../types/interface';
import { SelectPure } from 'select-pure/lib/components';

class AudioCall {
  library: ILibraryResponse[] = [];

  async start() {
    const game = new Game();
    const template = game.checkParameter() === undefined ? 'selection-menu' : game.checkGameName();
    game.renderTemplate(template, '.main');

    // if (template === 'selection-menu') {
    //   this.menu(game);
    // } else {
    //   this.library = (await game.createLibrary()) as ILibraryResponse[];
    // }
  }

  // menu(game: Game) {
  //   // todo перенести весь метод в game, переделать location.replace
  //   // todo сделать так чтобы все методы внтури вызвывались вне menu
  //   const startBtn = document.querySelector('#start-btn') as HTMLButtonElement;

  //   let selectedDificultLevel: string;
  //   const selectPure = document.querySelector('select-pure') as SelectPure;
  //   selectPure.addEventListener('change', () => {
  //     selectedDificultLevel = selectPure.value;
  //   });

  //   startBtn?.addEventListener('click', async () => {
  //     if (!Number(selectedDificultLevel)) return alert('Сначала выбери уровень сложности');

  //     const randomPageNumber = this.randomIndexGenerator(30);
  //     location.replace(`http://localhost:8080/audio-call.html?group=${selectedDificultLevel}&page=${randomPageNumber}`);
  //   });
  // }
}

new AudioCall().start();

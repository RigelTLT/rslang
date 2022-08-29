import Game from '../game/game';
import { ILibraryResponse } from '../../types/interface';

class AudioCall {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  rightWordsArr: ILibraryResponse[] = [];

  wrongWordsArr: ILibraryResponse[] = [];

  async start() {
    const game = new Game();
    const template = game.checkParameter() === undefined ? 'selection-menu' : game.checkGameName();
    game.renderTemplate(template, '.main');

    if (template === 'selection-menu') {
      game.menu();
    } else {
      this.library = (await game.createLibrary()) as ILibraryResponse[];
      this.fillWord(this.selectedWordIndex, game);
    }
  }

  fillWord(wordId: number, game: Game) {
    const words = document.querySelectorAll('.options__item') as NodeList;
    const randomRigthPosition = game.randomIndexGenerator(words.length);

    words.forEach((elem, index) => {
      if (index === randomRigthPosition) {
        elem.textContent = this.library[this.selectedWordIndex].word;
      } else {
        elem.textContent = this.library[game.randomIndexGenerator(this.library.length)].word;
      }
    });
  }
}

new AudioCall().start();

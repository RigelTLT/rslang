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
      this.buttonHandler(game);
    }
  }

  fillWord(wordId: number, game: Game) {
    const words = document.querySelectorAll('.options__item') as NodeList;
    const randomRightPosition = game.randomIndexGenerator(words.length);

    words.forEach((elem, index) => {
      if (index !== randomRightPosition) {
        elem.textContent = `${index + 1} ${
          this.library[game.randomIndexGenerator(this.library.length, wordId)].wordTranslate
        }`;
      } else {
        elem.textContent = `${index + 1} ${this.library[wordId].wordTranslate}`;
      }
    });
  }

  buttonHandler(game: Game) {
    const gameContainer = document.querySelector('.game-container') as HTMLElement;
    gameContainer.addEventListener('click', (event) => {
      this.gameClick(event, game);
    });
  }

  gameClick(event: Event, game: Game) {
    const target = event.target as HTMLButtonElement;

    if (target.getAttribute('active')) {
      target.textContent = 'не знаю';
      target.setAttribute('active', 'false');
      this.selectedWordIndex++;
      this.fillWord(this.selectedWordIndex, game);
    }

    if (target.classList.contains('options__item')) {
      this.selectedWordIndex++;
    }

    if (target.classList.contains('nextWordButton')) {
      target.textContent = 'дальше';
      target.setAttribute('active', 'true');
    }
  }
}

new AudioCall().start();

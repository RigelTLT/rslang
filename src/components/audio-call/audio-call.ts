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
      // console.log(this.library);
    }
  }

  fillWord(wordId: number, game: Game) {
    const words = document.querySelectorAll('.options__item') as NodeList;
    const randomRightPosition = game.randomIndexGenerator(words.length);

    words.forEach((elem, index) => {
      (elem as HTMLElement).classList.remove('right');
      (elem as HTMLElement).classList.remove('active');

      if (index !== randomRightPosition) {
        const wrongWordIndex = game.randomIndexGenerator(this.library.length, wordId);

        elem.textContent = `${index + 1} ${this.library[wrongWordIndex].wordTranslate}`;
      } else {
        elem.textContent = `${index + 1} ${this.library[wordId].wordTranslate}`;
        (elem as HTMLElement).classList.add('right');
      }
    });
  }

  buttonHandler(game: Game) {
    const controlButtons = document.querySelector('.control') as HTMLElement;

    controlButtons.addEventListener('click', (event) => {
      this.gameClick(event, game);
    });
  }

  gameClick(event: Event, game: Game) {
    const nextWordButton = document.querySelector('.nextWordButton') as HTMLButtonElement;
    const wordsButtons = document.querySelectorAll('.options__item') as NodeList;

    const target = event.target as HTMLButtonElement;
    if (target.tagName !== 'BUTTON') return;

    if (target.classList.contains('nextWordButton')) {
      if (nextWordButton.classList.contains('words-changed')) {
        // 1. меняем текст кнопки на "дальше"
        nextWordButton.textContent = 'не знаю';
        this.selectedWordIndex++;
        this.fillWord(this.selectedWordIndex, game);

        wordsButtons.forEach((button) => {
          const buttonCopy = button as HTMLButtonElement;
          buttonCopy.disabled = false;
        });

        nextWordButton.classList.remove('words-changed');
      } else {
        // 2. возвращаем текст кнопки на "не знаю", увеличиваем индекс, вызываем fillWord
        wordsButtons.forEach((button) => {
          const buttonCopy = button as HTMLButtonElement;

          if (buttonCopy.classList.contains('right')) {
            buttonCopy.classList.add('active');
          }
          buttonCopy.disabled = true;
        });

        nextWordButton.textContent = 'дальше';
        nextWordButton.classList.add('words-changed');
      }
    }
  }
}

new AudioCall().start();

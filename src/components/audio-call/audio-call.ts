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
      const isAllWordsCompleted = this.rightWordsArr.length + this.wrongWordsArr.length === this.library.length;

      if (isAllWordsCompleted) {
        return game.gameResult(this.rightWordsArr, this.wrongWordsArr);
      }

      this.gameClick(event, game);
    });

    document.body.addEventListener('keyup', (event) => {
      const isAllWordsCompleted = this.rightWordsArr.length + this.wrongWordsArr.length === this.library.length;

      if (isAllWordsCompleted) {
        return game.gameResult(this.rightWordsArr, this.wrongWordsArr);
      }

      const keyCode = event.code;

      if (keyCode === 'Space') {
        alert('воспроизводит аудио');
      }
      if (keyCode === 'Enter') {
        // показывает правильный ответ и меняет элементы в диваке illustration
        // логика аналогична нажатию мышкой
        this.nextStep(game);
      }
      if (keyCode === 'Digit1') {
        const target = document.querySelectorAll('.options__item')[0] as HTMLButtonElement;
        this.optionsChange(target);
      }
      if (keyCode === 'Digit2') {
        const target = document.querySelectorAll('.options__item')[1] as HTMLButtonElement;
        this.optionsChange(target);
      }
      if (keyCode === 'Digit3') {
        const target = document.querySelectorAll('.options__item')[2] as HTMLButtonElement;
        this.optionsChange(target);
      }
      if (keyCode === 'Digit4') {
        const target = document.querySelectorAll('.options__item')[3] as HTMLButtonElement;
        this.optionsChange(target);
      }
      if (keyCode === 'Digit5') {
        const target = document.querySelectorAll('.options__item')[4] as HTMLButtonElement;
        this.optionsChange(target);
      }
    });
  }

  gameClick(event: Event, game: Game) {
    const target = event.target as HTMLButtonElement;

    if (target.tagName !== 'BUTTON') return;

    if (target.classList.contains('nextWordButton')) {
      this.nextStep(game);
    }

    if (target.classList.contains('options__item')) {
      this.optionsChange(target);
    }
  }

  nextStep(game: Game) {
    const nextWordButton = document.querySelector('.nextWordButton') as HTMLButtonElement;
    const wordsButtons = document.querySelectorAll('.options__item') as NodeList;

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

      this.wrongWordsArr.push(this.library[this.selectedWordIndex]);

      nextWordButton.textContent = 'дальше';
      nextWordButton.classList.add('words-changed');
    }
  }

  optionsChange(target: HTMLButtonElement) {
    const nextWordButton = document.querySelector('.nextWordButton') as HTMLButtonElement;
    const wordsButtons = document.querySelectorAll('.options__item') as NodeList;
    wordsButtons.forEach((button) => {
      const buttonCopy = button as HTMLButtonElement;

      if (buttonCopy.classList.contains('right')) {
        buttonCopy.classList.add('active');
      }
      buttonCopy.disabled = true;
    });
    nextWordButton.textContent = 'дальше';
    nextWordButton.classList.add('words-changed');

    if (target.classList.contains('right')) {
      // добавляются слова в библиотеку верных ответов
      this.rightWordsArr.push(this.library[this.selectedWordIndex]);
    } else {
      // добавляются слова в библиотеку ложных ответов
      this.wrongWordsArr.push(this.library[this.selectedWordIndex]);
    }
  }
}

new AudioCall().start();

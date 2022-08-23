import Game from '../game/game';
import { ILibraryResponse } from '../interface/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  async start() {
    const game = new Game();

    this.library = (await game.createLibrary()) as ILibraryResponse[];
    game.renderTemplate(game.checkGameName());
    this.timer();
    this.fillWord(this.selectedWordIndex, this.randomBooleanGenerator());

    this.trueButtonHandler();
    this.falseButtonHandler();
  }

  timer() {
    const timerSelect = document.querySelector('.timer') as HTMLDivElement;
    let timeLeft = Number(timerSelect.textContent);

    const intervalId = setInterval(() => {
      timeLeft = timeLeft - 1;
      timerSelect.innerText = timeLeft.toString();

      if (timeLeft < 1) clearInterval(intervalId);
    }, 1000);

    return timeLeft;
  }

  fillWord(wordId: number, isRightTranslate: boolean) {
    const [originalWord, translateWord] = (document.querySelector('.words') as HTMLDivElement).children;

    if (isRightTranslate) {
      originalWord.innerHTML = this.library[wordId].word;
      translateWord.innerHTML = this.library[wordId].wordTranslate;
    } else {
      originalWord.innerHTML = this.library[wordId].word;
      const randomIndex = this.randomIndexGenerator(this.library.length, wordId);

      translateWord.innerHTML = this.library[randomIndex].wordTranslate;
    }
  }

  btnListener = () => {
    this.selectedWordIndex++;

    if (this.selectedWordIndex >= this.library.length) return alert('слова кончились');

    this.fillWord(this.selectedWordIndex, this.randomBooleanGenerator());
  };

  trueButtonHandler() {
    // const falseButton = document.querySelector('.control .false');
    const trueButton = document.querySelector('.control .true');

    trueButton?.addEventListener('click', this.btnListener);
    document.body?.addEventListener('keyup', (event) => event.key === 'ArrowLeft' && this.btnListener());
  }

  falseButtonHandler() {
    const falseButton = document.querySelector('.control .false');
    // const trueButton = document.querySelector('.control .true');

    falseButton?.addEventListener('click', this.btnListener);
    document.body.addEventListener('keyup', (event) => event.key === 'ArrowRight' && this.btnListener());
  }

  randomBooleanGenerator() {
    return Math.random() > 0.5 ? true : false;
  }

  randomIndexGenerator(maxLength: number, exclude: number) {
    const randomNubmer = Math.floor(Math.random() * maxLength);

    if (randomNubmer === exclude) {
      this.randomIndexGenerator(maxLength, exclude);
    }

    return randomNubmer;
  }
}

new Sprint();

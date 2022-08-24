import Game from '../game/game';
import { ILibraryResponse } from '../interface/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  countRight = 0;

  resultScores = 0;

  rightWordsArr: ILibraryResponse[] = [];

  wrongWordArr: ILibraryResponse[] = [];

  private _bool = () => (Math.random() > 0.5 ? true : false);

  get boolean(): boolean {
    return this._bool();
  }

  async start() {
    const game = new Game();

    this.library = (await game.createLibrary()) as ILibraryResponse[];
    game.renderTemplate(game.checkGameName());
    this.fillWord(this.selectedWordIndex, this.boolean);

    this.trueButtonHandler();
    this.timer();
    // this.falseButtonHandler();
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

  trueButtonHandler() {
    const trueButton = document.querySelector('.control .true');
    const points = document.querySelector('.points') as HTMLElement;

    const btnListener = () => {
      const realIndexPlusOne = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      if (realIndexPlusOne < this.library.length) {
        this.fillWord(this.selectedWordIndex + 1, isRightTranslate);
      }

      if (isRightTranslate) {
        this.countRight += 1;
        this.resultScores += 20;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
      } else {
        this.wrongWordArr.push(this.library[this.selectedWordIndex]);
      }
      this.selectedWordIndex += 1;
      if (realIndexPlusOne >= this.library.length) {
        return alert('слова кончились');
      }
    };

    trueButton?.addEventListener('click', btnListener);
    document.body.addEventListener('keyup', (event) => event.key === 'ArrowRight' && btnListener());
  }

  // falseButtonHandler() {
  //   const falseButton = document.querySelector('.control .false');

  //   falseButton?.addEventListener('click', () => this.btnListener());
  //   document.body.addEventListener('keyup', (event) => event.key === 'ArrowRight' && this.btnListener());
  // }

  randomIndexGenerator(maxLength: number, exclude: number): number {
    const randomNubmer = Math.floor(Math.random() * maxLength);

    if (randomNubmer === exclude) {
      return this.randomIndexGenerator(maxLength, exclude);
    }

    return randomNubmer;
  }
}

new Sprint();

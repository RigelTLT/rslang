import Game from '../game/game';
import { ILibraryResponse } from '../../types/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  countRight = 0;

  coefficient = 10;

  resultScores = 0;

  rightWordsArr: ILibraryResponse[] = [];

  wrongWordsArr: ILibraryResponse[] = [];

  private _bool = () => (Math.random() > 0.5 ? true : false);

  get boolean(): boolean {
    return this._bool();
  }

  async start() {
    const game = new Game();

    const template = game.checkParameter() === undefined ? 'selection-menu' : game.checkGameName();

    game.renderTemplate(template, '.main');

    if (template === 'selection-menu') {
      game.menu();
    } else {
      this.library = (await game.createLibrary()) as ILibraryResponse[];
      this.fillWord(this.selectedWordIndex, this.boolean, game);
      this.trueButtonHandler(game);
      this.falseButtonHandler(game);
      this.timer(game);
    }
  }

  timer(game: Game) {
    const timerSelect = document.querySelector('.timer') as HTMLDivElement;
    let timeLeft = Number(timerSelect.textContent);

    const intervalId = setInterval(() => {
      timeLeft--;
      timerSelect.innerText = timeLeft.toString();

      const isAllWordsCompleted = this.rightWordsArr.length + this.wrongWordsArr.length === this.library.length;
      if (timeLeft < 1 || isAllWordsCompleted) {
        clearInterval(intervalId);
        if (!this.rightWordsArr.length) this.wrongWordsArr = this.library;

        game.gameResult(this.rightWordsArr, this.wrongWordsArr);
      }
    }, 1000);

    return timeLeft;
  }

  fillWord(wordId: number, isRightTranslate: boolean, game: Game) {
    const [originalWord, translateWord] = (document.querySelector('.words') as HTMLDivElement).children;

    if (isRightTranslate) {
      originalWord.innerHTML = this.library[wordId].word;
      translateWord.innerHTML = this.library[wordId].wordTranslate;
    } else {
      originalWord.innerHTML = this.library[wordId].word;
      const randomIndex = game.randomIndexGenerator(this.library.length, wordId);

      translateWord.innerHTML = this.library[randomIndex].wordTranslate;
    }
  }

  fillCircle(): void {
    const circles = document.querySelectorAll('.series-response .circle') as NodeList;

    if (!circles[this.countRight - 1]) {
      this.clearCircles();
      return undefined;
    }

    (circles[this.countRight - 1] as HTMLElement).classList.add('active');
  }

  clearCircles(): void {
    const circles = document.querySelectorAll('.series-response .circle') as NodeList;
    circles.forEach((elem) => {
      (elem as HTMLElement).classList.remove('active');
    });
  }

  trueButtonHandler(game: Game) {
    const trueButton = document.querySelector('.control .true') as HTMLElement;

    const btnListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const coefficientValue = document.querySelector('.coefficient span') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;

      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate, game);
      }

      if (this.library[this.selectedWordIndex].wordTranslate === translateWord) {
        this.countRight += 1;
        this.resultScores += this.coefficient;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
        this.fillCircle();

        if (this.countRight > 3) {
          this.countRight = 0;
          this.coefficient *= 2;
          coefficientValue.textContent = String(this.coefficient);
          this.clearCircles();
        }
      } else {
        this.countRight = 0;
        this.wrongWordsArr.push(this.library[this.selectedWordIndex]);
        this.clearCircles();
      }

      this.selectedWordIndex += 1;
    };

    trueButton?.addEventListener('click', btnListener);
    document.body.addEventListener('keyup', (event) => event.key === 'ArrowLeft' && btnListener());
  }

  falseButtonHandler(game: Game) {
    const falseButton = document.querySelector('.control .false') as HTMLElement;

    const btnListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const coefficientValue = document.querySelector('.coefficient span') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate, game);
      }

      if (this.library[this.selectedWordIndex].wordTranslate !== translateWord) {
        this.countRight += 1;
        this.resultScores += this.coefficient;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
        this.fillCircle();

        if (this.countRight > 3) {
          this.countRight = 0;
          this.coefficient *= 2;
          coefficientValue.textContent = String(this.coefficient);
          this.clearCircles();
        }
      } else {
        this.countRight = 0;
        this.wrongWordsArr.push(this.library[this.selectedWordIndex]);
        this.clearCircles();
      }

      this.selectedWordIndex += 1;
    };

    falseButton?.addEventListener('click', btnListener);
    document.body.addEventListener('keyup', (event) => event.key === 'ArrowRight' && btnListener());
  }
}

new Sprint().start();

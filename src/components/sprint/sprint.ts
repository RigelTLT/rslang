import Game from '../game/game';
import { ILibraryResponse } from '../../types/interface';

class Sprint {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  countRight = 0;

  coefficient = 10;

  resultScores = 0;

  rightWordsArr: ILibraryResponse[] = [];

  wrongWordsArr: ILibraryResponse[] = [];

  maxCorrectAnswersCount = 0;

  correctAnsersCount = 0;

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
    const innerBar = document.querySelector('.inner-bar') as HTMLDivElement;
    let width = 0;
    let timeLeft = Number(timerSelect.textContent);

    const intervalId = setInterval(() => {
      width += 1.67;
      timeLeft--;
      timerSelect.innerText = timeLeft.toString();
      innerBar.style.width = `${String(width)}%`;
      const isAllWordsCompleted = this.rightWordsArr.length + this.wrongWordsArr.length === this.library.length;
      if (timeLeft < 1 || isAllWordsCompleted) {
        clearInterval(intervalId);
        if (!this.rightWordsArr.length) this.wrongWordsArr = this.library;

        game.gameResult(this.rightWordsArr, this.wrongWordsArr, this.maxCorrectAnswersCount);
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

    const buttonListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const coefficientValue = document.querySelector('.coefficient span') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;

      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate, game);
      }
      const audio = new Audio();
      if (this.library[this.selectedWordIndex].wordTranslate === translateWord) {
        this.correctAnsersCount++;
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

        if (this.correctAnsersCount > this.maxCorrectAnswersCount) {
          this.maxCorrectAnswersCount = this.correctAnsersCount;
        }

        audio.src = `./assets/audio/yes.mp3`;
      } else {
        this.correctAnsersCount = 0;
        this.countRight = 0;
        this.wrongWordsArr.push(this.library[this.selectedWordIndex]);
        this.clearCircles();
        audio.src = `./assets/audio/no.mp3`;
      }
      audio.autoplay = true;
      this.selectedWordIndex += 1;
    };

    Game.trueButtonFunc = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        buttonListener();
      }
    };

    trueButton?.addEventListener('click', buttonListener);
    document.body.addEventListener('keyup', Game.trueButtonFunc);
  }

  falseButtonHandler(game: Game) {
    const falseButton = document.querySelector('.control .false') as HTMLElement;

    const buttonListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const coefficientValue = document.querySelector('.coefficient span') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate, game);
      }
      const audio = new Audio();
      if (this.library[this.selectedWordIndex].wordTranslate !== translateWord) {
        this.correctAnsersCount++;
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

        if (this.correctAnsersCount > this.maxCorrectAnswersCount) {
          this.maxCorrectAnswersCount = this.correctAnsersCount;
        }
        audio.src = `./assets/audio/yes.mp3`;
      } else {
        this.correctAnsersCount = 0;
        this.countRight = 0;
        this.wrongWordsArr.push(this.library[this.selectedWordIndex]);
        this.clearCircles();
        audio.src = `./assets/audio/no.mp3`;
      }
      audio.autoplay = true;
      this.selectedWordIndex += 1;
    };

    Game.falseButtonFunc = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        buttonListener();
      }
    };

    falseButton?.addEventListener('click', buttonListener);
    document.body.addEventListener('keyup', Game.falseButtonFunc);
  }
}

new Sprint().start();

import Game from '../game/game';
import { ILibraryResponse } from '../interface/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  countRight = 0;

  coefficient = 10;

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

  fillCircle(): void {
    const circles = document.querySelectorAll('.series-response .circle') as NodeList;
    (circles[this.countRight - 1] as HTMLElement).classList.add('active');
  }

  clearCircles(): void {
    const circles = document.querySelectorAll('.series-response .circle') as NodeList;
    circles.forEach((elem) => {
      (elem as HTMLElement).classList.remove('active');
    });
  }

  trueButtonHandler() {
    const trueButton = document.querySelector('.control .true') as HTMLElement;

    const btnListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const coefficientValue = document.querySelector('.coefficient span') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;

      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate);
      }

      if (this.library[this.selectedWordIndex].wordTranslate === translateWord) {
        if (this.countRight >= 3) {
          this.countRight = -1;
          this.coefficient *= 2;
          coefficientValue.textContent = String(this.coefficient);
          this.clearCircles();
        }
        this.countRight += 1;
        this.resultScores += this.coefficient;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
        this.fillCircle();
      } else {
        this.countRight = 0;
        this.wrongWordArr.push(this.library[this.selectedWordIndex]);
        this.clearCircles();
      }
      console.log(this.countRight);

      this.selectedWordIndex += 1;
      if (nextIndex >= this.library.length) {
        return alert('слова кончились');
      }
    };

    trueButton?.addEventListener('click', btnListener);
    document.body.addEventListener('keyup', (event) => event.key === 'ArrowLeft' && btnListener());
  }

  falseButtonHandler() {
    const falseButton = document.querySelector('.control .false') as HTMLElement;

    const btnListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const coefficientValue = document.querySelector('.coefficient span') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate);
      }

      if (this.library[this.selectedWordIndex].wordTranslate !== translateWord) {
        if (this.countRight >= 3) {
          this.countRight = -1;
          this.coefficient *= 2;
          coefficientValue.textContent = String(this.coefficient);
          this.clearCircles();
        }
        this.countRight += 1;
        this.resultScores += this.coefficient;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
        this.fillCircle();
      } else {
        this.countRight = 0;
        this.wrongWordArr.push(this.library[this.selectedWordIndex]);
        this.clearCircles();
      }
      console.log(this.countRight);

      this.selectedWordIndex += 1;
      if (nextIndex >= this.library.length) {
        return alert('слова кончились');
      }
    };

    falseButton?.addEventListener('click', btnListener);
    document.body.addEventListener('keyup', (event) => event.key === 'ArrowRight' && btnListener());
  }

  randomIndexGenerator(maxLength: number, exclude: number): number {
    const randomNumber = Math.floor(Math.random() * maxLength);
    if (!randomNumber) {
      return this.randomIndexGenerator(maxLength, exclude);
    }

    if (randomNumber === exclude) {
      return this.randomIndexGenerator(maxLength, exclude);
    }

    return randomNumber;
  }
}

new Sprint();

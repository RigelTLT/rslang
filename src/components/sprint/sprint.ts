import Game from '../game/game';
import { ILibraryResponse } from '../interface/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  countRight = 0;

  resultScores = 0;

  rightWordsArr: ILibraryResponse[] = [];

  wrongWordArr: ILibraryResponse[] = [];

  //

  private _bool = () => (Math.random() > 0.5 ? true : false);

  get boolean(): boolean {
    console.log(this._bool(), 'результат геттера boolean');

    return this._bool();
  }

  async start() {
    const game = new Game();

    this.library = (await game.createLibrary()) as ILibraryResponse[];
    game.renderTemplate(game.checkGameName());
    console.log(this.boolean, 'boolean при старте');

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
    console.log(isRightTranslate, 'isRightTranslate в fillWord');

    if (isRightTranslate) {
      originalWord.innerHTML = this.library[wordId].word;
      translateWord.innerHTML = this.library[wordId].wordTranslate;
    } else {
      originalWord.innerHTML = this.library[wordId].word;
      // console.log(this.randomIndexGenerator(this.library.length, wordId), 'при фолсе');
      const randomIndex = this.randomIndexGenerator(this.library.length, wordId);

      translateWord.innerHTML = this.library[randomIndex].wordTranslate;
    }
  }

  trueButtonHandler() {
    const trueButton = document.querySelector('.control .true') as HTMLElement;

    const btnListener = () => {
      const points = document.querySelector('.points') as HTMLElement;
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      console.log('нажатие на true');

      console.log(isRightTranslate, 'isRightTranslate в кнопке true');
      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate);
      }

      if (this.library[this.selectedWordIndex].wordTranslate === translateWord) {
        this.countRight += 1;
        this.resultScores += 20;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
      } else {
        this.countRight = 0;
        this.wrongWordArr.push(this.library[this.selectedWordIndex]);
      }

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
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      console.log('нажатие на false');
      console.log(isRightTranslate, 'isRightTranslate в кнопке false');
      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate);
      }

      if (this.library[this.selectedWordIndex].wordTranslate !== translateWord) {
        this.countRight += 1;
        this.resultScores += 20;
        points.textContent = String(this.resultScores);
        this.rightWordsArr.push(this.library[this.selectedWordIndex]);
      } else {
        this.countRight = 0;
        this.wrongWordArr.push(this.library[this.selectedWordIndex]);
      }

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

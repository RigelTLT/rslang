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
    this.falseButtonHandler();
    console.log(this.library, 'библиотека слов');
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
    const trueButton = document.querySelector('.control .true') as HTMLElement;
    const points = document.querySelector('.points') as HTMLElement;

    trueButton?.addEventListener('click', (event) => {
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;
      console.log(this.library[this.selectedWordIndex].wordTranslate === translateWord);

      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
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
        console.log(this.wrongWordArr, 'не верно отмеченные слова');
        console.log(this.rightWordsArr, 'верно отмеченные слова');
        return alert('слова кончились');
      }
    });
    // document.body.addEventListener('keyup', (event) => event.key === 'ArrowLeft' && this.btnListener());
  }

  falseButtonHandler() {
    const falseButton = document.querySelector('.control .false') as HTMLElement;
    const points = document.querySelector('.points') as HTMLElement;

    falseButton?.addEventListener('click', (event) => {
      const translateWord = (document.querySelector('.words .translate') as HTMLDivElement).textContent;

      const nextIndex = this.selectedWordIndex + 1;

      const isRightTranslate = this.boolean;
      if (nextIndex < this.library.length) {
        this.fillWord(nextIndex, isRightTranslate);
      }

      console.log(this.library[this.selectedWordIndex].wordTranslate !== translateWord);
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
        console.log(this.wrongWordArr, 'не верно отмеченные слова');
        console.log(this.rightWordsArr, 'верно отмеченные слова');
        return alert('слова кончились');
      }
    });
    // document.body.addEventListener('keyup', (event) => event.key === 'ArrowRight' && this.btnListener());
  }

  randomIndexGenerator(maxLength: number, exclude: number): number {
    const randomNubmer = Math.floor(Math.random() * maxLength - 1);

    if (randomNubmer === exclude) {
      return this.randomIndexGenerator(maxLength - 1, exclude);
    }

    return randomNubmer;
  }
}

new Sprint();

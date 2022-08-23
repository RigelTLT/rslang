import Game from '../game/game';
import { ILibraryResponse } from '../interface/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  async start() {
    const game = new Game();
    this.library = (await game.createLibrary()) as ILibraryResponse[];
    game.renderTemplate(game.checkGameName());
    this.timer();
    this.fillWord(1, false);
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
      let randomIndex = this.randomIndexGenerator(this.library.length);

      if (randomIndex === wordId) randomIndex = this.randomIndexGenerator(this.library.length);

      translateWord.innerHTML = this.library[randomIndex].wordTranslate;
    }
  }

  randomIndexGenerator(maxLength: number) {
    return Math.floor(Math.random() * maxLength);
  }
}

new Sprint();

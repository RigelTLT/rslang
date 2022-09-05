import Game, { playAudio } from '../game/game';
import { ILibraryResponse } from '../../types/interface';
import { baseUrl } from '../../api/basicApi';

class AudioCall {
  library: ILibraryResponse[] = [];

  selectedWordIndex = 0;

  rightWordsArr: ILibraryResponse[] = [];

  wrongWordsArr: ILibraryResponse[] = [];

  excludedIndexesArr: number[] = [];

  maxCorrectAnswersCount = 0;

  correctAnsersCount = 0;

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
        let wrongWordIndex = game.randomIndexGenerator(this.library.length, wordId);

        while (this.excludedIndexesArr.includes(wrongWordIndex)) {
          this.excludedIndexesArr.push(wrongWordIndex);
          wrongWordIndex = game.randomIndexGenerator(this.library.length, wordId);
        }

        elem.textContent = `${index + 1}. ${this.library[wrongWordIndex].wordTranslate}`;
      } else {
        const svgButton = document.querySelector('.illustration__svg');

        svgButton?.setAttribute('data-id', `${this.library[this.selectedWordIndex].id}`);
        elem.textContent = `${index + 1}. ${this.library[wordId].wordTranslate}`;
        (elem as HTMLElement).classList.add('right');
      }
    });

    this.excludedIndexesArr = [];

    const audioPath = `${baseUrl}${this.library[this.selectedWordIndex].audio}`;
    playAudio(audioPath);
  }

  buttonHandler(game: Game) {
    const controlButtons = document.querySelector('.control') as HTMLElement;
    controlButtons.addEventListener('click', (event) => {
      const isAllWordsCompleted = this.rightWordsArr.length + this.wrongWordsArr.length === this.library.length;

      if (isAllWordsCompleted) {
        return game.gameResult(this.rightWordsArr, this.wrongWordsArr, this.maxCorrectAnswersCount);
      }

      this.gameClick(event, game);
    });

    const illustrationSvgImage = document.querySelector('.illustration__svg');
    illustrationSvgImage?.addEventListener('click', () => {
      const audioPath = `${baseUrl}${this.library[this.selectedWordIndex].audio}`;
      playAudio(audioPath);
    });

    document.body.addEventListener('keyup', (event) => {
      const isAllWordsCompleted = this.rightWordsArr.length + this.wrongWordsArr.length === this.library.length;

      if (isAllWordsCompleted) {
        return game.gameResult(this.rightWordsArr, this.wrongWordsArr, this.maxCorrectAnswersCount);
      }

      const keyCode = event.code;

      if (keyCode === 'Space') {
        const audioPath = `${baseUrl}${this.library[this.selectedWordIndex].audio}`;
        playAudio(audioPath);
      }
      if (keyCode === 'Enter') {
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

    const illustration = document.querySelector('.illustration') as HTMLDivElement;
    const svgElem = document.querySelector('.illustration__svg') as Node;

    if (nextWordButton.classList.contains('words-changed')) {
      // 1. меняем текст кнопки на "дальше"
      nextWordButton.textContent = 'не знаю';
      this.selectedWordIndex++;
      this.fillWord(this.selectedWordIndex, game);

      illustration.innerHTML = '';
      illustration.append(svgElem);

      wordsButtons.forEach((button) => {
        const buttonCopy = button as HTMLButtonElement;
        buttonCopy.disabled = false;
      });

      nextWordButton.classList.remove('words-changed');
    } else {
      // 2. возвращаем текст кнопки на "не знаю", увеличиваем индекс, вызываем fillWord
      wordsButtons.forEach((button) => {
        const buttonCopy = button as HTMLButtonElement;
        if (buttonCopy.classList.contains('right')) buttonCopy.classList.add('active');

        buttonCopy.disabled = true;
      });
      this.newIllustration(illustration, svgElem);

      this.wrongWordsArr.push(this.library[this.selectedWordIndex]);

      nextWordButton.textContent = 'дальше';
      nextWordButton.classList.add('words-changed');
    }
  }

  optionsChange(target: HTMLButtonElement) {
    const nextWordButton = document.querySelector('.nextWordButton') as HTMLButtonElement;
    const wordsButtons = document.querySelectorAll('.options__item') as NodeList;

    const illustration = document.querySelector('.illustration') as HTMLDivElement;
    const svgElem = document.querySelector('.illustration__svg') as Node;

    wordsButtons.forEach((button) => {
      const buttonCopy = button as HTMLButtonElement;

      if (buttonCopy.classList.contains('right')) {
        buttonCopy.classList.add('active');
      }
      buttonCopy.disabled = true;
    });
    nextWordButton.textContent = 'дальше';
    nextWordButton.classList.add('words-changed');
    const audio = new Audio();
    if (target.classList.contains('right')) {
      this.correctAnsersCount++;
      // добавляются слова в библиотеку верных ответов
      this.rightWordsArr.push(this.library[this.selectedWordIndex]);

      if (this.maxCorrectAnswersCount > this.correctAnsersCount) {
        this.maxCorrectAnswersCount = this.correctAnsersCount;
      }
      audio.src = `./assets/audio/yes.mp3`;
    } else {
      // добавляются слова в библиотеку ложных ответов
      this.wrongWordsArr.push(this.library[this.selectedWordIndex]);
      audio.src = `./assets/audio/no.mp3`;
    }
    audio.autoplay = true;
    this.newIllustration(illustration, svgElem);
  }

  newIllustration(selector: HTMLDivElement, svg: Node) {
    const image = document.createElement('img');
    image.classList.add('illustration-img');
    image.src = `${baseUrl}${this.library[this.selectedWordIndex].image}`;

    const block = document.createElement('div');
    block.classList.add('illustration-block');
    const word = document.createElement('span');
    word.classList.add('illustration-word');
    word.textContent = this.library[this.selectedWordIndex].word;
    block.append(svg, word);

    selector.innerHTML = '';
    selector.append(image, block);
  }
}

new AudioCall().start();

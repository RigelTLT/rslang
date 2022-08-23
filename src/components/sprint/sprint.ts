import Game from '../game/game';
import { ILibraryResponse } from '../interface/interface';

export class Sprint {
  library: ILibraryResponse[] = [];

  async start() {
    const game = new Game();
    this.library = (await game.createLibrary()) as ILibraryResponse[];
    game.renderTemplate(game.checkGameName());
  }
}

new Sprint();

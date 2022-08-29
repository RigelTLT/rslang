import Game from '../game/game';
import { ILibraryResponse } from '../../types/interface';
import { SelectPure } from 'select-pure/lib/components';

class AudioCall {
  library: ILibraryResponse[] = [];

  async start() {
    const game = new Game();
    const template = game.checkParameter() === undefined ? 'selection-menu' : game.checkGameName();
    game.renderTemplate(template, '.main');

    if (template === 'selection-menu') {
      game.menu();
    } else {
      this.library = (await game.createLibrary()) as ILibraryResponse[];
    }
  }
}

new AudioCall().start();

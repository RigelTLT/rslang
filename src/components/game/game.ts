import { getWords } from '../api/basicApi';
import { IapiRequestWords, ILibraryResponse } from '../interface/interface';
import 'select-pure';
import './game.scss';

export default class Game {
  renderTemplate(templateId: string, selector: string): void {
    const template = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
    const container = document.querySelector(`${selector}`) as HTMLElement;
    container.innerHTML = '';
    container.append(template.content.cloneNode(true));
  }

  checkGameName(): 'sprint' | 'audio-call' {
    return document.location.pathname.includes('sprint') ? 'sprint' : 'audio-call';
  }

  checkParameter(): IapiRequestWords | undefined {
    if (document.location.search === '') return undefined;
    const params = new URLSearchParams(document.location.search);
    const page = params.get('page') as string;
    const group = params.get('group') as string;
    return { page, group };
  }

  async createLibrary(): Promise<ILibraryResponse[] | undefined> {
    // const gameName = this.checkGameName();
    const parameterPage = this.checkParameter();
    // const realPageNumber = String(Number(parameterPage?.page) - 1);
    const pageNumber = Number(parameterPage?.page);

    // console.log(parameterPage, 'parameterPage');
    // console.log(realPageNumber, 'gameRealPageName');
    // console.log(pageNumber, 'pageNumber');

    if (pageNumber >= 1 && parameterPage !== undefined) {
      const getWordsLibrary = await getWords(parameterPage);
      return getWordsLibrary;
    }
  }
}

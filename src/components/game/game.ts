import { getWords } from '../api/basicApi';
import { IapiRequestWords } from '../interface/interface';
import 'select-pure';
import './game.scss';
import { SelectPure } from 'select-pure/lib/components';

export default class Game {
  renderTemplate(templateId: string): void {
    let template;
    if (this.checkParameter() === undefined) {
      template = document.querySelector(`#selection-menu`) as HTMLTemplateElement;
    } else {
      template = document.querySelector(`#${templateId}`) as HTMLTemplateElement;
    }
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    main.append(template.content.cloneNode(true));

    const selectPure = document.querySelector('select-pure') as SelectPure;

    console.log(selectPure.selectedIndex, 'select value');
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

  async createLibrary() {
    const gameName = this.checkGameName();
    const parameterPage = this.checkParameter();
    const realPageNumber = String(Number(parameterPage?.page) - 1);
    const pageNumber = Number(parameterPage?.page);
    console.log(parameterPage, 'parameterPage');
    console.log(realPageNumber, 'gameRealPageName');
    console.log(pageNumber, 'pageNumber');
    // getWords()
    if (gameName === 'sprint') {
      if (Number(pageNumber) >= 1 && parameterPage !== undefined) {
        console.log(await getWords(parameterPage), 'библиотека слов');

        // return await getWords(parameterPage);
      }
    } else if (gameName === 'audio-call') {
    }
  }
}

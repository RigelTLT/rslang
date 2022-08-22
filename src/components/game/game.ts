import { getWords } from "../api/basicApi";
import { IapiRequestWords } from "../interface/interface";


export default class Game{
    checkGameName(): "sprint" | "audio-call"{
        return document.location.pathname.includes('sprint') ? "sprint" : "audio-call";
    }

    checkParameter(): IapiRequestWords | undefined{
        if(document.location.search === "") return undefined
        
        const params = new URLSearchParams(document.location.search);
        const page = params.get('page') as string;
        const group = params.get('group') as string;
        return {page, group}
    }

    async createLibrary(){
        const gameName = this.checkGameName();
        console.log(gameName, "gameName");
        
        const parameterPage = this.checkParameter();
        const realPage = String(Number(parameterPage?.page) - 1);
        const page = Number(parameterPage?.page);
        console.log(parameterPage, "parameterPage");
        console.log(realPage, "gamerealPageName");
        console.log(page, "page");
        // getWords()
        if(gameName === "sprint"){
            if(Number(page) >= 1 && parameterPage !== undefined){
                console.log(await getWords(parameterPage), 'библиотека слов');
                return await getWords(parameterPage);
            }
        }
        else if(gameName === "audio-call"){

        }
    }
}
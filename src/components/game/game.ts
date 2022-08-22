import { getWords } from "../api/basicApi";
import { IapiRequestWords } from "../interface/interface";


export default class Game{
    checkGameName(): "sprint" | "audio-call"{
        return document.location.pathname.includes('sprint') ? "sprint" : "audio-call";
    }

    checkParameter(): undefined | IapiRequestWords{
        if(document.location.search !== ""){
            const params = new URLSearchParams(document.location.search);
            const page = params.get('page') as string;
            const group = params.get('group') as string;
            return {page, group}
        } 
        return undefined
    }

    createLibrary(){
        const gameName = this.checkGameName();
        const parameterPage = this.checkParameter();
        const realPage = String(Number(parameterPage?.page) - 1);
        // getWords()
        if(gameName === "sprint"){
            if(realPage >= "1" && parameterPage !== undefined){
                // return getWords(parameterPage)
                console.log(getWords(parameterPage));
                
            }
        }
        else if(gameName === "audio-call"){

        }
    }
}
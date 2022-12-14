export interface IapiRequestWords {
  group: string;
  page: string;
}
export interface IapiRequestUserWords {
  group: string;
  status: string;
}
export interface Isignin {
  email: string;
  password: string;
}
export interface Iregist {
  name: string;
  email: string;
  password: string;
}
export interface IidToken {
  id: string;
  token: string;
  name: string;
  refreshToken: string;
}
export interface Iauth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
export interface IuserWords {
  difficulty: string;
  optional: unknown;
}
export interface ILibraryResponse {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export interface IgetUserAllWords {
  id: string;
  difficulty: string;
  wordId: string;
}

export interface IapiWords {
  id: string;
  idWord: string;
  token: string;
  body: IuserWords;
}

export interface Istatistic {
  learnedWords: number;
  optional: IstatisticBody;
}

export interface IstatisticBody {
  date: string;
  sprint: {
    learnedWord: string[];
    correctAnswersPercent: number[];
    longestSeriesCorrect: number;
  };
  audioCall: {
    learnedWord: string[];
    correctAnswersPercent: number[];
    longestSeriesCorrect: number;
  };
  textBook: {
    learnedWord: string[];
    numberOfWordsLearned: number;
    percentageOfCorrectAnswers: string;
  };
}

export interface IstatisticResponse extends Istatistic {
  id?: string;
}

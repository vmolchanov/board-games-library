export interface ISession {
  id: number;
  chatId: string;
  key: string;
  move: string;
  tip: string;
}

export interface IWord {
  id: number;
  value: string;
}

export interface ISessionWord {
  id: number;
  session: ISession;
  word: IWord;
  open: boolean;
  position: number;
}

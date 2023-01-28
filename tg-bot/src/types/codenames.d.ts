import {IUser} from './user';

export interface ICodenamesInitGame {
  players: IUser[];
  chatId: number;
}

export interface ICodenamesSession {
  id: number;
  chatId: number;
  key: string;
  move: string;
  tip: string;
  count: number;
}

export interface ICodenamesPlayer {
  id: number;
  sessionId: number;
  userId: number;
  role: string;
}

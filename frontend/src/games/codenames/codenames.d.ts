import {EState, ERole} from './enums';

export type TCurrentPlayer = IUser & {role: ERole};

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  telegramId?: string;
}

export interface IWord {
  id?: number;
  value?: string;
}

export interface IFieldState {
  word: IWord;
  state: EState;
  position: number;
}

export interface ICodenamesState {
  currentPlayer: TCurrentPlayer;
  fieldState: IFieldState[];
  move: ERole;
  tip: string;
  sessionId: number;
}

export interface ITipFormSubmit {
  tip: string;
  count: number;
}

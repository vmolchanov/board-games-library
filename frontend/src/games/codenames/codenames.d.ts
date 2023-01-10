export declare enum ERole {
  RED_CAPTAIN = "RED_CAPTAIN",
  BLUE_CAPTAIN = "BLUE_CAPTAIN",
  RED_AGENT = "RED_AGENT",
  BLUE_AGENT = "BLUE_AGENT"
}

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

export type TWordState = 'NOT_OPENED' | 'BLUE_AGENT' | 'RED_AGENT' | 'NEUTRAL' | 'KILLER';

export interface IFieldState {
  readonly word: IWord;

  readonly state: TWordState;

  readonly position: number;
}

export interface ICodenamesState {
  currentPlayer: IUser & {role: ERole};

  fieldState: IFieldState[];

  move: ERole;

  tip: string;

  sessionId: number;
}

export interface ITipFormSubmit {
  tip: string;
  count: number;
}

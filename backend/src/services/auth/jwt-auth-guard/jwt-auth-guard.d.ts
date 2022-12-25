import {Socket} from 'socket.io';
import {IncomingMessage} from 'http';

export interface IRequest {
  getToken: () => string;
  handleOnReject: () => void;
}

export type TRequest = Socket | IncomingMessage;

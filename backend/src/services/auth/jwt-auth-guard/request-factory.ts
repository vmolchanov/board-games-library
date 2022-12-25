import {IncomingMessage} from 'http';
import {Socket} from 'socket.io';

import {HttpRequest} from './http-request';
import {WebSocketRequest} from './web-socket-request';

import type {TRequest} from './jwt-auth-guard';

export class RequestFactory {
  public getRequest(req: TRequest) {
    if (req instanceof IncomingMessage) {
      return new HttpRequest(req as IncomingMessage);
    }
    if (req instanceof Socket) {
      return new WebSocketRequest(req as Socket);
    }
    return null;
  }
}

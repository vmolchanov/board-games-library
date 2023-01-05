import {Socket} from 'socket.io';
import {AbstractRequest} from './abstract-request';

import type {IRequest} from './jwt-auth-guard';

export class WebSocketRequest extends AbstractRequest implements IRequest {
  constructor(req: Socket) {
    super(req);
  }

  public getToken(): string {
    return (this.req as Socket).handshake.auth.token;
  }

  public handleOnReject(): void {
    (this.req as Socket).emit('unauthorized');
  }
}

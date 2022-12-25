import {IncomingMessage} from 'http';
import {UnauthorizedException} from '@nestjs/common';
import {AbstractRequest} from './abstract-request';

import type {IRequest} from './jwt-auth-guard';

export class HttpRequest extends AbstractRequest implements IRequest {
  constructor(req: IncomingMessage) {
    super(req);
  }

  public getToken(): string {
    return (this.req as IncomingMessage).headers.authorization
  }

  public handleOnReject(): void {
    throw new UnauthorizedException('Пользователь не авторизован')
  }
}

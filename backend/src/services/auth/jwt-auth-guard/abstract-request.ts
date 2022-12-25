import type {TRequest} from './jwt-auth-guard';

export abstract class AbstractRequest {
  protected readonly req: TRequest;

  protected constructor(req: TRequest) {
    this.req = req;
  }
}

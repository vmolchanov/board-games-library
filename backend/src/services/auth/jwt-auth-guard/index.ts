import {CanActivate, ExecutionContext} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {RequestFactory} from './request-factory';

export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const requestFactory = new RequestFactory();
    const request = requestFactory.getRequest(context.switchToHttp().getRequest());

    try {
      const authHeader = request.getToken();
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        request.handleOnReject();
      }

      req.user = await jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET);

      return true;
    } catch (e) {
      request.handleOnReject();
    }
  }

}

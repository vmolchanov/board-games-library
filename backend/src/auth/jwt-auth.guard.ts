import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не авторизован')
      }

      req.user = await jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET);

      return true;
    } catch (e) {
      throw new UnauthorizedException('Пользователь не авторизован')
    }
  }

}

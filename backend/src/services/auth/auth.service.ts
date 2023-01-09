import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';

import type {JwtPayload} from 'jsonwebtoken';
import type {ITokensPair} from './auth.types';
import type {TAccessToken, TLoginToken, TRefreshToken} from './auth.types';

import {UserDto} from '../user/user.dto';
import {UserService} from '../user/user.service';
import {GenerateLoginLinkDto} from './dto/generate-login-link';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_SECRET;
  private readonly ACCESS_TOKEN_EXPIRES_IN;
  private readonly REFRESH_TOKEN_SECRET;
  private readonly REFRESH_TOKEN_EXPIRES_IN;
  private readonly AUTH_TOKEN_SECRET;
  private readonly AUTH_TOKEN_EXPIRES_IN;

  constructor(
    configService: ConfigService,
    private readonly userService: UserService
  ) {
    this.ACCESS_TOKEN_SECRET = configService.get<string>('AUTH_ACCESS_TOKEN_SECRET');
    this.ACCESS_TOKEN_EXPIRES_IN = configService.get<string>('AUTH_ACCESS_TOKEN_EXPIRES_IN');
    this.REFRESH_TOKEN_SECRET = configService.get<string>('AUTH_REFRESH_TOKEN_SECRET');
    this.REFRESH_TOKEN_EXPIRES_IN = configService.get<string>('AUTH_REFRESH_TOKEN_EXPIRES_IN');
    this.AUTH_TOKEN_SECRET = configService.get<string>('AUTH_LOGIN_TOKEN_SECRET');
    this.AUTH_TOKEN_EXPIRES_IN = configService.get<string>('AUTH_LOGIN_TOKEN_EXPIRES_IN');
  }

  /**
   * Генерирует ссылку для аутентификации
   * @param {UserDto} userDto
   * @return {string} - ссылка типа http://127.0.0.1:5173/join/<header>/<payload>/<signature>
   */
  async generateLoginLink(userDto: UserDto): Promise<GenerateLoginLinkDto> {
    let user = await this.userService.getUserByTelegramId(userDto.telegramId);
    if (user === null) {
      user = await this.userService.createUser(userDto);
    }

    const authTokenPayload = user;

    const authToken = jwt.sign(authTokenPayload, this.AUTH_TOKEN_SECRET, {
      expiresIn: this.AUTH_TOKEN_EXPIRES_IN
    });

    const [header, payload, signature] = authToken.split('.');

    return {
      link: `http://127.0.0.1:5173/join/${header}/${payload}/${signature}`,
    };
  }

  /**
   * Генерирует access и refresh токены по токену из ссылки
   * @param authToken
   */
  async loginByAuthToken(authToken: TLoginToken): Promise<ITokensPair> {
    const user = await this.validateToken(authToken, this.AUTH_TOKEN_SECRET);
    return this.generateLoginTokens(Object.assign({}, user));
  }

  /**
   * Сгенерировать новые access и refresh токены
   * @param {TRefreshToken} refreshToken
   */
  async refreshTokens(refreshToken: TRefreshToken): Promise<ITokensPair> {
    const user = await this.validateToken(refreshToken, this.REFRESH_TOKEN_SECRET);
    return this.generateLoginTokens(user);
  }

  async getUserByToken(token: TAccessToken): Promise<UserDto> {
    return await this.validateToken(token, this.ACCESS_TOKEN_SECRET);
  }

  /**
   * Проверяет токен на валидность
   * @param {TAccessToken | TRefreshToken | TLoginToken} token
   * @param {String} secret
   */
  async validateToken(token: TAccessToken | TRefreshToken | TLoginToken, secret: string): Promise<UserDto> {
    try {
      if (!token) {
        throw new UnauthorizedException('Невалидный токен');
      }

      const payload = await jwt.verify(token, secret) as UserDto & JwtPayload;
      if (!payload) {
        throw new UnauthorizedException('Невалидный токен');
      }

      return {
        id: payload.id,
        telegramId: payload.telegramId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
      };
    } catch {
      throw new UnauthorizedException('Невалидный токен');
    }
  }

  /**
   * Генерирует access и refresh токены
   * @param {UserDto} userDto
   */
  generateLoginTokens(userDto: UserDto): ITokensPair {
    const accessToken = jwt.sign(userDto, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(userDto, this.REFRESH_TOKEN_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES_IN,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}

import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';

import type {JwtPayload} from 'jsonwebtoken';
import type {ITokensPair} from './auth.types';
import type {TAccessToken, TLoginToken, TRefreshToken} from './auth.types';

import {UserDto} from '../user/dto/user.dto';
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
   * @return {string} - ссылка типа http://localhost:8080/join/<token>
   */
  async generateLoginLink(userDto: UserDto): Promise<GenerateLoginLinkDto> {
    const user = await this.userService.isUserExist(userDto.telegramId)
      ? await this.userService.getUserById(userDto.telegramId)
      : await this.userService.createUser(userDto);

    const authTokenPayload = {user};

    const authToken = jwt.sign(authTokenPayload, this.AUTH_TOKEN_SECRET, {
      expiresIn: this.AUTH_TOKEN_EXPIRES_IN
    });

    return {
      link: `http://localhost:8080/join/${authToken}`,
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

  async refreshTokens(refreshToken: TRefreshToken): Promise<ITokensPair> {
    const user = await this.validateToken(refreshToken, this.REFRESH_TOKEN_SECRET);
    return this.generateLoginTokens(user);
  }

  async validateToken(token: TAccessToken | TRefreshToken | TLoginToken, secret: string): Promise<UserDto> {
    try {
      if (!token) {
        throw new UnauthorizedException('Невалидный токен');
      }

      const payload = await jwt.verify(token, secret) as UserDto & JwtPayload;
      if (!payload) {
        throw new UnauthorizedException('Невалидный токен');
      }

      return payload.user;
    } catch {
      throw new UnauthorizedException('Невалидный токен');
    }
  }

  /**
   * Генерирует access и refresh токены
   * @param userDto
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

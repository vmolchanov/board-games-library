import {Controller, Post, Body, Res, Req} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';
import {UseSwagger} from '../../app.decorator';
import {swaggerConfig} from './auth.swagger';

import {UserDto} from '../user/user.dto';
import {GenerateLoginLinkDto} from './dto/generate-login-link';
import {LoginByAuthTokenDto} from './dto/login-by-auth-token';
import {RefreshTokensResponseDto} from './dto/refresh-tokens-response';

import {AuthService} from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('generate-login-link')
  @UseSwagger(swaggerConfig.get('generateLoginLink'))
  async generateLoginLink(@Body() userDto: UserDto): Promise<GenerateLoginLinkDto> {
    return this.authService.generateLoginLink(userDto);
  }

  @Post('login-by-link')
  @UseSwagger(swaggerConfig.get('loginByAuthToken'))
  async loginByAuthToken(
    @Res({passthrough: true}) response,
    @Body('authToken') authToken
  ): Promise<LoginByAuthTokenDto> {
    const tokens = await this.authService.loginByAuthToken(authToken);
    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      token: tokens.accessToken,
    };
  }

  @Post('refresh')
  @UseSwagger(swaggerConfig.get('refreshTokens'))
  async refreshTokens(@Req() request, @Res({passthrough: true}) response): Promise<RefreshTokensResponseDto> {
    const refreshToken = request.cookies['refreshToken'];
    const tokens = await this.authService.refreshTokens(refreshToken);
    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      token: tokens.accessToken,
    };
  }
}

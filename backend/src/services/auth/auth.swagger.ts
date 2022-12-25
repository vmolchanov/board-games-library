import {ISwaggerConfig} from '../../app';

import {UserDto} from '../user/user.dto';
import {GenerateLoginLinkDto} from './dto/generate-login-link';
import {LoginByAuthTokenDto} from './dto/login-by-auth-token';
import {RefreshTokensResponseDto} from './dto/refresh-tokens-response';

const swaggerConfig = new Map<string, ISwaggerConfig>();

swaggerConfig.set('generateLoginLink', {
  apiBody: {
    type: UserDto
  },
  apiOperation: {
    summary: 'Сгенерировать ссылку для аутентификации'
  },
  apiCreatedResponse: {
    description: 'Ссылка сгенерирована',
    type: GenerateLoginLinkDto,
  },
});

swaggerConfig.set('loginByAuthToken', {
  apiBody: {
    type: GenerateLoginLinkDto,
  },
  apiOperation: {
    summary: 'Залогиниться по токену',
  },
  apiCreatedResponse: {
    description: 'Аутентификация успешно пройдена',
    type: LoginByAuthTokenDto,
  },
  apiUnauthorizedResponse: {
    description: 'Невалидный токен',
    type: String
  },
});

swaggerConfig.set('refreshTokens', {
  apiOperation: {
    summary: 'Обновить access и refresh токены',
  },
  apiOkResponse: {
    description: 'Токены обновлены',
    type: RefreshTokensResponseDto,
  },
  apiUnauthorizedResponse: {
    description: 'Refresh токен отсутствует или срок жизни его истек',
  }
});

export {swaggerConfig};

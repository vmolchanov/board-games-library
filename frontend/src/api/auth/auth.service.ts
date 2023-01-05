import type {AxiosResponse} from 'axios';
import type {IAuthByLinkDto, IRefreshDto} from './auth';

import api from '../base-service';

const baseUrl = (params) => `/auth/${params[0]}`;

export class AuthService {
  static async loginByLink(authToken: string): Promise<string> {
    const response: AxiosResponse<IAuthByLinkDto> = await api(baseUrl`login-by-link`, {
      method: 'POST',
      data: {
        token: authToken,
      },
    });
    return response.data.token;
  }

  static async refresh(): Promise<string> {
    const response: AxiosResponse<IRefreshDto> = await api(baseUrl`refresh`, {
      method: 'POST',
    });
    return response.data.token;
  }
}

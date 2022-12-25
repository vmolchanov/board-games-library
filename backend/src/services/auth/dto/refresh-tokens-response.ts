import {ApiProperty} from '@nestjs/swagger';

import type {TAccessToken} from '../auth.types';

export class RefreshTokensResponseDto {
  @ApiProperty({
    type: String,
    description: 'Токен',
    example: 'fbsdhg32784gfy3grfbyeuerg3478fveuy3g73fyvwe3764yweuhja2',
    required: true,
  })
  readonly token: TAccessToken;
}

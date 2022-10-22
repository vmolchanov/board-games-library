import {ApiProperty} from '@nestjs/swagger';

export class GenerateLoginLinkDto {
  @ApiProperty({
    type: String,
    description: 'Ссылка для аутентификации пользователя',
    example: 'http://boardgameslib.ru/join/3985te78wdqiu723cmrhet8ui9323i4',
    required: true,
  })
  readonly link: string;
}

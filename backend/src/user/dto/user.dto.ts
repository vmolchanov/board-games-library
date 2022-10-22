import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Уникальный идентификатор в telegram',
    example: 'fj34gyutrgfdhj434',
    required: true,
  })
  readonly telegramId: string;

  @ApiProperty({
    type: String,
    description: 'Имя',
    example: 'Vladimir',
    required: true,
  })
  readonly firstName: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    example: 'Ivanov',
    required: false,
  })
  readonly lastName: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм',
    example: 'ivavleg',
    required: false,
  })
  readonly userName: string;
}

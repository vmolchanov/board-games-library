import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class UserDto {
  readonly id?: number;

  @ApiProperty({
    type: String,
    description: 'Уникальный идентификатор в telegram',
    example: 'fj34gyutrgfdhj434',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly telegramId: string;

  @ApiProperty({
    type: String,
    description: 'Имя',
    example: 'Vladimir',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    example: 'Ivanov',
    required: false,
  })
  @IsString()
  readonly lastName?: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм',
    example: 'ivavleg',
    required: false,
  })
  @IsString()
  readonly userName?: string;
}

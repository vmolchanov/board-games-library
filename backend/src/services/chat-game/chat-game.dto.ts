import {IsNumber} from 'class-validator';

export class ChatGameDto {
  readonly id?: number;

  @IsNumber()
  readonly chatId: number;

  @IsNumber()
  readonly gameId: number;
}

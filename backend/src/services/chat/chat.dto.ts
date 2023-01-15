import {IsNumber} from 'class-validator';

export class ChatDto {
  readonly id?: number;

  @IsNumber()
  readonly chatId: number;
}

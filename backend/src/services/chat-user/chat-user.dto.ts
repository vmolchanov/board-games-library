import {IsNumber} from 'class-validator';

export class ChatUserDto {
  readonly id?: number;

  @IsNumber()
  readonly chatId: number;

  @IsNumber()
  readonly userId: number;
}

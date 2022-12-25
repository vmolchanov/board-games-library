import {IsNumber} from 'class-validator';

export class PlayerDto {
  @IsNumber()
  readonly id?: number;

  @IsNumber()
  readonly sessionId?: number;

  @IsNumber()
  readonly userId?: number;

  @IsNumber()
  readonly role?: string;
}

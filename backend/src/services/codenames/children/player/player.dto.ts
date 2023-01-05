import {IsNumber, IsString} from 'class-validator';

export class PlayerDto {
  readonly id?: number;

  @IsNumber()
  readonly sessionId?: number;

  @IsNumber()
  readonly userId?: number;

  @IsString()
  readonly role?: string;
}

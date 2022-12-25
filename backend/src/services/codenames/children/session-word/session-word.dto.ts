import {IsBoolean, IsNumber} from 'class-validator';

export class SessionWordDto {
  readonly id?: number;

  @IsNumber()
  readonly sessionId?: number;

  @IsNumber()
  readonly wordId?: number;

  @IsBoolean()
  readonly open?: boolean;

  @IsNumber()
  readonly position?: number;
}

import {IsNumber, IsString} from 'class-validator';

export class GameDto {
  readonly id?: number;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly minPlayers: number;

  @IsNumber()
  readonly maxPlayers: number;
}

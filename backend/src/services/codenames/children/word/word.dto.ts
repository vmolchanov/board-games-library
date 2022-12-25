import {IsNotEmpty, IsString} from 'class-validator';

export class WordDto {
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  readonly value: string;
}

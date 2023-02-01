import {UserDto} from '../user/user.dto';
import {IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class InitGameDto {
  @IsArray()
  players: UserDto[];

  @IsNumber()
  chatId: number;
}

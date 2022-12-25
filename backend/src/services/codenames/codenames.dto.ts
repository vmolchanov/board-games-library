import {UserDto} from '../user/user.dto';
import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class InitGameDto {
  @IsArray()
  players: UserDto[];

  @IsString()
  @IsNotEmpty()
  chatId: string;
}

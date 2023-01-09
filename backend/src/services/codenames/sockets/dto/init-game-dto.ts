import {ERole} from '../../children/role/role.enum';
import {FieldStateDto} from './field-state-dto';
import {User} from '../../../user/user.model';

export class InitGameDto {
  currentPlayer: User & {role: ERole};

  fieldState: FieldStateDto[];

  move: ERole;

  tip: string;

  sessionId: number;
}

import {
  Column,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';

import {Session} from '../session/session.model';
import {User} from '../../../user/user.model';
import {ERole} from '../role/role.enum';


@Table
export class Player extends Model<Player> {
  @ForeignKey(() => Session)
  @Column
  sessionId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  role: ERole;
}

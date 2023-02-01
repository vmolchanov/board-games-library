import {AllowNull, Column, ForeignKey, Model, Table} from 'sequelize-typescript';

import {ERole} from '../role/role.enum';
import {Chat} from '../../../chat/chat.model';

@Table
export class Session extends Model<Session> {
  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @Column
  key: string;

  @Column
  move: ERole;

  @AllowNull
  @Column
  tip: string;

  @AllowNull
  @Column
  count: number;
}

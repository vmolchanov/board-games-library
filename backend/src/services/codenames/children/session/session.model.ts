import {AllowNull, Column, Model, Table} from 'sequelize-typescript';

import {ERole} from '../role/role.enum';


@Table
export class Session extends Model<Session> {
  @Column
  chatId: string;

  @Column
  key: string;

  @Column
  move: ERole;

  @AllowNull
  @Column
  tip: string;
}

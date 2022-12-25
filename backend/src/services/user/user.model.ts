import {Model, Column, Table, PrimaryKey, BelongsToMany, AllowNull} from 'sequelize-typescript';
// import {Role} from '../codenames/children/role/role.model';
// import {Player} from '../codenames/children/player/player.model';
// import {Session} from '../codenames/children/session/session.model';


@Table
export class User extends Model<User> {
  @Column
  telegramId: string;

  @Column
  firstName: string;

  @AllowNull
  @Column
  lastName: string;

  @AllowNull
  @Column
  userName: string;

  // @BelongsToMany(() => Role, () => Player)
  // codenamesRoles: Role[];

  // @BelongsToMany(() => Session, () => Player)
  // codenamesSessions: Session[];
}

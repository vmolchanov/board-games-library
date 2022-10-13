import {Model, Column, DataType, Table} from 'sequelize-typescript';

interface UserCreationAttrs {
  telegramId: string;
  firstName: string;
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttrs> {
  @Column({type: DataType.STRING, unique: true, primaryKey: true})
  telegramId: string;

  @Column({type: DataType.STRING})
  firstName: string;

  @Column({type: DataType.STRING, allowNull: true})
  lastName: string;

  @Column({type: DataType.STRING, allowNull: true})
  userName: string;
}

import {Model, Column, Table, Unique} from 'sequelize-typescript';

@Table
export class Chat extends Model<Chat> {
  @Unique
  @Column
  chatId: number;
}

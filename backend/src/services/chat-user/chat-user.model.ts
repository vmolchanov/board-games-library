import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Chat} from '../chat/chat.model';
import {User} from '../user/user.model';

@Table
export class ChatUser extends Model<ChatUser> {
  @Column
  @ForeignKey(() => Chat)
  chatId: number;

  @Column
  @ForeignKey(() => User)
  userId: number;
}

import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import {Chat} from '../chat/chat.model';
import {Game} from '../game/game.model';

@Table
export class ChatGame extends Model<ChatGame> {
  @Column
  @ForeignKey(() => Chat)
  chatId: number;

  @Column
  @ForeignKey(() => Game)
  gameId: number;
}

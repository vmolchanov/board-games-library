import {BelongsToMany, Column, Model, Table} from 'sequelize-typescript';
import {Session} from '../session/session.model';
import {SessionWord} from '../session-word/session-word.model';

@Table
export class Word extends Model<Word> {
  @Column
  value: string;

  @BelongsToMany(() => Session, () => SessionWord)
  sessions: Session[];
}

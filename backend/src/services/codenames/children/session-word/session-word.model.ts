import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';

import {Session} from '../session/session.model';
import {Word} from '../word/word.model';

interface SessionWordCreationAttrs {
  open: boolean;
  position: number;
  sessionId: number;
  wordId: number
}

@Table
export class SessionWord extends Model<SessionWord, SessionWordCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  open: boolean;

  @Column
  position: number;

  @ForeignKey(() => Session)
  @Column
  sessionId: number;

  @ForeignKey(() => Word)
  @Column
  wordId: number;

  // @BelongsTo(() => Session)
  // sessions: Session[];
}

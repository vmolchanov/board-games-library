import {BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';

import {Session} from '../session/session.model';
import {Word} from '../word/word.model';

@Table
export class SessionWord extends Model<SessionWord> {
  @ForeignKey(() => Session)
  @Column
  sessionId: number;

  @ForeignKey(() => Word)
  @Column
  wordId: number;

  @Column
  open: boolean;

  @Column
  position: number;

  @BelongsTo(() => Session)
  sessions: Session[];
}

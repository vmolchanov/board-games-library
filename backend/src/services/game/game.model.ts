import {Model, Column, Table, Unique} from 'sequelize-typescript';

@Table
export class Game extends Model<Game> {
  @Unique
  @Column
  title: string;

  @Column
  minPlayers: number;

  @Column
  maxPlayers: number;
}

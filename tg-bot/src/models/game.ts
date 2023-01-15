import db from '../db';
import {DataTypes} from 'sequelize';

const Game = db.define('game', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  title: {type: DataTypes.STRING},
  minPlayers: {type: DataTypes.INTEGER},
  maxPlayers: {type: DataTypes.INTEGER},
})

export default Game;

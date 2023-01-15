import db from '../db';
import {DataTypes} from 'sequelize';

const ChatGame = db.define('chatGame', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  chatId: {type: DataTypes.INTEGER},
  gameId: {type: DataTypes.INTEGER},
});

export default ChatGame;

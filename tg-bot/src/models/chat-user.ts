import db from '../db';
import {DataTypes} from 'sequelize';

const ChatUser = db.define('chatUser', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  chatId: {type: DataTypes.INTEGER},
  userId: {type: DataTypes.INTEGER},
})

export default ChatUser;

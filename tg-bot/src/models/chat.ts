import db from '../db';
import {DataTypes} from 'sequelize';

const Chat = db.define('chat', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  chatId: {type: DataTypes.INTEGER, unique: true},
})

export default Chat;

import db from '../db';
import {DataTypes} from 'sequelize';

const User = db.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
  telegramId: {type: DataTypes.STRING, unique: true},
  lastName: {type: DataTypes.STRING},
  firstName: {type: DataTypes.STRING},
  nickName: {type: DataTypes.STRING},
})

export default User;

import {Dialect} from 'sequelize/types/sequelize';

import {Sequelize} from 'sequelize';

const DB_NAME: string = 'board-games-library-bot';
const LOGIN: string = 'postgres';
const PASSWORD: string = 'postgres';
const HOST: string = 'localhost';
const PORT: number = 5432;
const DIALECT: Dialect = 'postgres';

export default new Sequelize(
  DB_NAME,
  LOGIN,
  PASSWORD,
  {
    host: HOST,
    port: PORT,
    dialect: DIALECT,
  }
);

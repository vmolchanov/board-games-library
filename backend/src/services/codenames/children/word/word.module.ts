import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {WordController} from './word.controller';
import {WordService} from './word.service';

import {SequelizeModule} from '@nestjs/sequelize';
import {Word} from './word.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([
      Word,
    ]),
  ],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}

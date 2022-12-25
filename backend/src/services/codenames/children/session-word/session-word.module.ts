import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SessionWordController} from './session-word.controller';
import {SessionWordService} from './session-word.service';

import {SequelizeModule} from '@nestjs/sequelize';
import {SessionWord} from './session-word.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([
      SessionWord,
    ]),
  ],
  controllers: [SessionWordController],
  providers: [SessionWordService],
  exports: [SessionWordService],
})
export class SessionWordModule {}

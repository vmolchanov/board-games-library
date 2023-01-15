import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SessionController} from './session.controller';
import {SessionService} from './session.service';

import {SequelizeModule} from '@nestjs/sequelize';
import {Session} from './session.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([
      Session,
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

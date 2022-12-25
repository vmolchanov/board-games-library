import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PlayerController} from './player.controller';
import {PlayerService} from './player.service';

import {SequelizeModule} from '@nestjs/sequelize';
import {Player} from './player.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([
      Player,
    ]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}

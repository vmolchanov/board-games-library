import {SequelizeModule} from '@nestjs/sequelize';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {Game} from './game.model';
import {GameController} from './game.controller';
import {GameService} from './game.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([Game]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}

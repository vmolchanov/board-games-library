import {SequelizeModule} from '@nestjs/sequelize';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ChatGame} from './chat-game.model';
import {ChatGameController} from './chat-game.controller';
import {ChatGameService} from './chat-game.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([ChatGame]),
  ],
  controllers: [ChatGameController],
  providers: [ChatGameService],
  exports: [ChatGameService],
})
export class ChatGameModule {}

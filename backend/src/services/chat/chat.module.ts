import {SequelizeModule} from '@nestjs/sequelize';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {Chat} from './chat.model';
import {ChatController} from './chat.controller';
import {ChatService} from './chat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([Chat]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}

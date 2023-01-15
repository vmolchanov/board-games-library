import {SequelizeModule} from '@nestjs/sequelize';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ChatUser} from './chat-user.model';
import {ChatUserController} from './chat-user.controller';
import {ChatUserService} from './chat-user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([ChatUser]),
  ],
  controllers: [ChatUserController],
  providers: [ChatUserService],
  exports: [ChatUserService],
})
export class ChatUserModule {}

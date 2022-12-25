import {forwardRef, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CodenamesController} from './codenames.controller';
import {CodenamesService} from './codenames.service';

import {CodenamesGateway} from './sockets/codenames.gateway';
import {SessionModule} from './children/session/session.module';
import {UserModule} from '../user/user.module';
import {PlayerModule} from './children/player/player.module';
import {WordModule} from './children/word/word.module';
import {SessionWordModule} from './children/session-word/session-word.module';
import {CodenamesGatewayService} from './sockets/codenames.gateway.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    forwardRef(() => SessionModule),
    forwardRef(() => UserModule),
    forwardRef(() => PlayerModule),
    forwardRef(() => WordModule),
    forwardRef(() => SessionWordModule),
  ],
  controllers: [CodenamesController],
  providers: [CodenamesService, CodenamesGateway, CodenamesGatewayService],
})
export class CodenamesModule {}

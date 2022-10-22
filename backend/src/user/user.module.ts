import {SequelizeModule} from '@nestjs/sequelize';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {UserController} from './user.controller';
import {UserService} from './user.service';
import {User} from './user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

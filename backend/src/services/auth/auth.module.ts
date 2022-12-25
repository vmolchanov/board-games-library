import {forwardRef, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

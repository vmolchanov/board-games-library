import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';

import {AuthModule} from './services/auth/auth.module';
import {UserModule} from './services/user/user.module';
import {CodenamesModule} from './services/codenames/codenames.module';
import {AppRoutingModule} from './app-routing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true
    }),

    AppRoutingModule,

    AuthModule,
    UserModule,
    CodenamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

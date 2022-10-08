import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {appConfig} from './app.config';

@Module({
  imports: [
    MongooseModule.forRoot(appConfig.db.uri),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

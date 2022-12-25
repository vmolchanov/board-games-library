import {Module} from '@nestjs/common';
import {RouterModule} from '@nestjs/core';
import {codenamesRouter} from './services/codenames/codenames.router';

const routes = [
  ...codenamesRouter,
];

@Module({
  imports: [RouterModule.register(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {CodenamesModule} from './codenames.module';

import {PlayerModule} from './children/player/player.module';
import {SessionModule} from './children/session/session.module';
import {SessionWordModule} from './children/session-word/session-word.module';
import {WordModule} from './children/word/word.module';


export const codenamesRouter = [
  {
    path: 'codenames',
    module: CodenamesModule,
    children: [
      {
        path: 'player',
        module: PlayerModule,
      },
      {
        path: 'session',
        module: SessionModule,
      },
      {
        path: 'session-word',
        module: SessionWordModule,
      },
      {
        path: 'word',
        module: WordModule,
      },
    ],
  },
];

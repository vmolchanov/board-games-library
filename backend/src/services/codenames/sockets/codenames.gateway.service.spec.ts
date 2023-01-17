import {CodenamesGatewayService} from './codenames.gateway.service';
import {DbService} from '../../../utils/db';
import {User} from '../../user/user.model';
import {Sequelize} from 'sequelize-typescript';
import {SessionService} from '../children/session/session.service';
import {UserService} from '../../user/user.service';
import {PlayerService} from '../children/player/player.service';
import {WordService} from '../children/word/word.service';
import {SessionWordService} from '../children/session-word/session-word.service';
import {Session} from '../children/session/session.model';
import {Player} from '../children/player/player.model';
import {Word} from '../children/word/word.model';
import {SessionWord} from '../children/session-word/session-word.model';
import {ERole} from '../children/role/role.enum';
import {InitGameDto} from './dto/init-game-dto';

describe('Codenames gateway service', () => {
  let codenamesGatewayService: CodenamesGatewayService;

  let sessionService: SessionService;
  let userService: UserService;
  let playerService: PlayerService;
  let wordService: WordService;
  let sessionWordService: SessionWordService;

  let memoryDatabase: Sequelize

  beforeAll(async () => {
    memoryDatabase = await DbService.createMemoryDatabase([
      User,
      Session,
      Player,
      Word,
      SessionWord,
    ]);

    sessionService = new SessionService(Session);
    userService = new UserService(User);
    playerService = new PlayerService(Player);
    wordService = new WordService(Word);
    sessionWordService = new SessionWordService(SessionWord);

    codenamesGatewayService = new CodenamesGatewayService(
      sessionService,
      userService,
      playerService,
      wordService,
      sessionWordService,
    );
  });

  describe('Codenames gateway service', () => {
    beforeEach(async () => {
      await User.create({
        id: 1,
        telegramId: 'hf437tfgus',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        userName: 'iivanov1990',
      });

      await Session.create({
        id: 1,
        key: 'R,BNNBN,RBKNB,RRRRB,BNKNR,NBBRR',
        move: ERole.BLUE_CAPTAIN,
        tip: null,
      });

      await Player.create({
        id: 1,
        sessionId: 1,
        userId: 1,
        role: ERole.BLUE_CAPTAIN
      });
    });

    afterEach(async () => {
      await memoryDatabase.truncate();
    });

    it('initGame', async () => {
      const user = await userService.getUserById('1');
      const initGameDto: InitGameDto = await codenamesGatewayService.initGame(user);

      expect(initGameDto.currentPlayer.role).not.toBeUndefined();
      expect(initGameDto.fieldState.length).toBe(25);

      expect(1).toBe(1);
    });
  });

  afterAll(() => {
    memoryDatabase.close();
  });
});

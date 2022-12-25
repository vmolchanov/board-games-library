import {SessionService} from '../children/session/session.service';
import {UserService} from '../../user/user.service';
import {PlayerService} from '../children/player/player.service';
import {ERole} from '../children/role/role.enum';
import {User} from '../../user/user.model';
import {Session} from '../children/session/session.model';
import {Player} from '../children/player/player.model';
import {Injectable} from '@nestjs/common';
import {WordDto} from '../children/word/word.dto';
import {SessionWordService} from '../children/session-word/session-word.service';
import {THero} from '../codenames';

@Injectable()
export class CodenamesGatewayService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly sessionWordService: SessionWordService,
  ) {}

  async isValidSession(sessionId: number): Promise<boolean> {
    const session = await this.sessionService.getSessionById(sessionId);
    return session !== null;
  }

  async makeTip(user: User, sessionId: number, tip: string): Promise<void> {
    const session = await this.sessionService.getSessionById(sessionId);

    const player = await this.getPlayerByUserAndSession(user, session);

    if (player === null || !this.isPlayerHasRoles(player, ERole.BLUE_CAPTAIN, ERole.RED_CAPTAIN)) {
      throw new Error();
    }

    const nextMove = session.move === ERole.BLUE_CAPTAIN ? ERole.BLUE_AGENT : ERole.RED_AGENT;

    await session.update({
      tip,
      move: nextMove,
    });
  }

  async makeMove(user: User, sessionId: number, word: WordDto): Promise<void> {
    const session: Session = await this.sessionService.getSessionById(sessionId);

    const player: Player = await this.getPlayerByUserAndSession(user, session);

    if (player === null || !this.isPlayerHasRoles(player, ERole.BLUE_CAPTAIN, ERole.RED_CAPTAIN)) {
      throw new Error();
    }

    const [sessionWord] = await this.sessionWordService.getSessionWordByParams({
      wordId: word.id,
      sessionId: session.id,
    });

    if (sessionWord.open) {
      return;
    }

    sessionWord.open = true;

    await this.sessionWordService.editSessionWord(sessionWord);

    const {position} = sessionWord;

    const hero: THero = this.sessionService.getHeroInKeyByPosition(session.key, position);

    // Первая буква роли соответствует персонажу в ключе
    if (player.role[0] !== hero) {
      const nextMove = session.move === ERole.BLUE_AGENT ? ERole.RED_CAPTAIN : ERole.BLUE_CAPTAIN;
      await session.update({
        tip: '',
        move: nextMove,
      });
    }
  }

  async getPlayerByUserAndSession(user: User, session: Session): Promise<Player | null> {
    if (session === null) {
      return null;
    }

    const player = await this.playerService.getPlayerByUserId(user.id);

    if (player.length === 0 || player[0].sessionId !== session.id) {
      return null;
    }

    return player[0];
  }

  isPlayerHasRoles(player: Player, ...roles: ERole[]): boolean {
    return roles.includes(player.role);
  }
}

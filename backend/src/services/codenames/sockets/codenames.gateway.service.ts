import {Injectable} from '@nestjs/common';

import type {THero, TWordState} from '../codenames';

import {SessionService} from '../children/session/session.service';
import {UserService} from '../../user/user.service';
import {PlayerService} from '../children/player/player.service';
import {SessionWordService} from '../children/session-word/session-word.service';
import {WordService} from '../children/word/word.service';

import {User} from '../../user/user.model';
import {Session} from '../children/session/session.model';
import {Player} from '../children/player/player.model';
import {SessionWord} from '../children/session-word/session-word.model';

import {WordDto} from '../children/word/word.dto';
import {UserDto} from '../../user/user.dto';
import {InitGameDto} from './dto/init-game-dto';
import {FieldStateDto} from './dto/field-state-dto';
import {SessionDto} from '../children/session/session.dto';

import {ERole} from '../children/role/role.enum';

@Injectable()
export class CodenamesGatewayService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly wordService: WordService,
    private readonly sessionWordService: SessionWordService,
  ) {}

  async getKey(sessionId: number): Promise<string> {
    const session = await this.sessionService.getSessionById(sessionId);
    return session.key;
  }

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

    await this.sessionService.editSession({
      ...session,
      tip,
      move: nextMove,
    } as SessionDto);
  }

  async makeMove(user: User, sessionId: number, word: WordDto): Promise<void> {
    const session: Session = await this.sessionService.getSessionById(sessionId);

    const player: Player = await this.getPlayerByUserAndSession(user, session);

    if (player === null || !this.isPlayerHasRoles(player, ERole.BLUE_AGENT, ERole.RED_AGENT)) {
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

    session.count--;

    // Первая буква роли соответствует персонажу в ключе
    if (player.role[0] !== hero || session.count === 0) {
      const nextMove = session.move === ERole.BLUE_AGENT ? ERole.RED_CAPTAIN : ERole.BLUE_CAPTAIN;
      session.tip = '';
      session.count = null;
      session.move = nextMove;
    }

    await this.sessionService.editSession(session as SessionDto);
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

  async initGame(user: UserDto): Promise<InitGameDto> {
    const currentUser: User = await this.userService.getUserByTelegramId(user.telegramId);
    const player: Player = (await this.playerService.getPlayerByUserId(currentUser.id))[0];
    const session: Session = await this.sessionService.getSessionById(player.sessionId);
    const sessionWords: SessionWord[] = await this.sessionWordService.getSessionWordByParams({
      sessionId: session.id,
    });

    const prevMove = session.move;

    const fieldState: FieldStateDto[] = [];

    for (let i = 0; i < sessionWords.length; i++) {
      const sessionWord: SessionWord = sessionWords[i];
      const word = await this.wordService.getWordById(sessionWord.wordId);

      let state: TWordState;

      if (!sessionWord.open) {
        state = 'NOT_OPENED';
      } else {
        const hero: THero = this.sessionService.getHeroInKeyByPosition(session.key, sessionWord.position);
        const heroToState: Record<THero, TWordState> = {
          R: 'RED_AGENT',
          B: 'BLUE_AGENT',
          K: 'KILLER',
          N: 'NEUTRAL',
        };
        state = heroToState[hero];
      }

      fieldState.push({word, state, position: sessionWord.position});
    }

    return {
      currentPlayer: {...currentUser, role: player.role} as User & {role: ERole},
      fieldState,
      move: session.move,
      tip: session.tip,
      count: session.count,
      sessionId: session.id,
      prevMove,
    };
  }

  async isGameOverByOpeningKiller(initGameDto: Omit<InitGameDto, 'currentPlayer'>): Promise<boolean> {
    return initGameDto.fieldState
      .map((state: FieldStateDto) => state.state)
      .includes('KILLER');
  }

  async isGameOverByCardsLimit(initGameDto: Omit<InitGameDto, 'currentPlayer'>): Promise<boolean> {
    const key = await this.getKey(initGameDto.sessionId);
    const roleWithNineAgents = key[0] === 'B' ? ERole.BLUE_AGENT : ERole.RED_AGENT;
    const roleWithEightAgents = roleWithNineAgents === ERole.BLUE_AGENT ? ERole.RED_AGENT : ERole.BLUE_AGENT;

    const [
      roleWithNineAgentsCount,
      roleWithEightAgentsCount,
    ] = initGameDto.fieldState.reduce((acc: [number, number], state: FieldStateDto) => {
      if (state.state === roleWithNineAgents) {
        acc[0]++;
      }
      if (state.state === roleWithEightAgents) {
        acc[1]++;
      }
      return acc;
    }, [0, 0]);

    return roleWithNineAgentsCount === 9 || roleWithEightAgentsCount === 8;
  }

  getOpponentRole(role: ERole): ERole {
    const [color, post] = (role as string).split('_');
    const newColor = color === 'RED' ? 'BLUE' : 'RED';
    return `${newColor}_AGENT` as ERole;
  }

  isPlayerHasRoles(player: Player, ...roles: ERole[]): boolean {
    return roles.includes(player.role);
  }
}

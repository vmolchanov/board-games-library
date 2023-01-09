import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {UserDto} from '../user/user.dto';
import {ERole} from './children/role/role.enum';

import {ArrayHelpers} from '../../utils/array-helpers';

import {SessionService} from './children/session/session.service';
import {UserService} from '../user/user.service';
import {PlayerService} from './children/player/player.service';
import {WordService} from './children/word/word.service';
import {SessionWordService} from './children/session-word/session-word.service';

import {User} from '../user/user.model';
import {Word} from './children/word/word.model';

import type {THero} from './codenames';
import {
  AGENTS_COUNT, EHeroCharacter, HEROES_COUNT_OF_CONTINUING_TEAM,
  HEROES_COUNT_OF_START_TEAM,
  KILLERS_COUNT,
  MINIMUM_PLAYERS_COUNT,
  NEUTRAL_COUNT,
  TOTAL_HEROES
} from './codenames.constant';
import {Session} from './children/session/session.model';
import {NumberHelpers} from '../../utils/number-helpers';


@Injectable()
export class CodenamesService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly wordService: WordService,
    private readonly sessionWordService: SessionWordService,
  ) {}

  async initializeGame(telegramUsers: UserDto[], chatId: string): Promise<void> {
    const session: Session = await this.initializeSession(chatId);

    const users = ArrayHelpers.shuffle(await this.getUsers(telegramUsers));
    await this.initializePlayers(users, session);

    const words: Word[] = await this.wordService.getAllWords();
    await this.initializeWords(words, session);
  }

  async initializeSession(chatId: string): Promise<Session> {
    console.log('here')
    const key = this.generateKey();
    const start = key[0];
    const move = start === EHeroCharacter.RED_AGENT ? ERole.RED_CAPTAIN : ERole.BLUE_CAPTAIN;

    return  await this.sessionService.addSession({
      chatId,
      key,
      move,
    });
  }

  async initializePlayers(users: UserDto[], session: Session): Promise<void> {
    const redCaptain = users.pop();
    const blueCaptain = users.pop();
    const redTeam = users.splice(0, users.length / 2);
    const blueTeam = users.slice();

    const players = [
      {
        userId: redCaptain.id,
        role: ERole.RED_CAPTAIN,
      },
      {
        userId: blueCaptain.id,
        role: ERole.BLUE_CAPTAIN,
      },
      ...redTeam.map(player => ({
        userId: player.id,
        role: ERole.RED_AGENT
      })),
      ...blueTeam.map(player => ({
        userId: player.id,
        role: ERole.BLUE_AGENT
      }))
    ];

    await Promise.all(players.map((player: UserDto & {userId: number, role: ERole}) => {
      return this.playerService.addPlayer({
        sessionId: session.id,
        userId: player.userId,
        role: player.role,
      });
    }));
  }

  async initializeWords(words: Word[], session: Session): Promise<void> {
    for (let i = 0; i < TOTAL_HEROES; i++) {
      const wordIndex: number = NumberHelpers.random(0, words.length);
      await this.sessionWordService.addSessionWord({
        sessionId: session.id,
        wordId: words[wordIndex].id,
        open: false,
        position: i,
      });
      words.splice(wordIndex, 1);
    }
  }

  /**
   * Генерирует игровой ключ в формате R,BNNBN,RBKNB,RRRRB,BNRNR,NBBRR
   */
  generateKey(): string {
    const start = ArrayHelpers.getRandomElement<string>([EHeroCharacter.RED_AGENT, EHeroCharacter.BLUE_AGENT]);

    const redAgentsCount: number = start === EHeroCharacter.RED_AGENT
      ? HEROES_COUNT_OF_START_TEAM
      : HEROES_COUNT_OF_CONTINUING_TEAM;
    const blueAgentsCount: number = AGENTS_COUNT - redAgentsCount;

    const field = new Array(TOTAL_HEROES);

    const heroCount = new Map<THero, number>();
    heroCount.set(EHeroCharacter.RED_AGENT, redAgentsCount);
    heroCount.set(EHeroCharacter.BLUE_AGENT, blueAgentsCount);
    heroCount.set(EHeroCharacter.KILLER, KILLERS_COUNT);
    heroCount.set(EHeroCharacter.NEUTRAL, NEUTRAL_COUNT);

    for (let i = 0; i < field.length; i++) {
      const heroes: THero[] = Array.from(heroCount.keys());
      const hero: THero = ArrayHelpers.getRandomElement<THero>(heroes);

      field[i] = hero;
      heroCount.set(hero, heroCount.get(hero) - 1);

      if (heroCount.get(hero) === 0) {
        heroCount.delete(hero);
      }
    }

    return `${start},${[
      field.slice(0, 5),
      field.slice(5, 10),
      field.slice(10, 15),
      field.slice(15, 20),
      field.slice(20, 25),
    ].map(row => row.join('')).join(',')}`;
  }

  /**
   * Возврвщает массив User из UserDto
   * Если у какого-то пользователя уже есть открытая сессия, то функция кидает исключение
   * @param telegramUsers
   */
  async getUsers(telegramUsers: UserDto[]): Promise<User[]> {
    if (telegramUsers.length < MINIMUM_PLAYERS_COUNT) {
      throw new BadRequestException('Минимальное количество игроков – 4');
    }

    const busyUsers = [];
    const users = [];
    for (let i = 0; i < telegramUsers.length; i++) {
      const telegramUser = telegramUsers[i];

      let user = await this.userService.getUserByTelegramId(telegramUser.telegramId);
      if (user === null) {
        user = await this.userService.createUser(telegramUser);
        users.push(user);
        continue;
      }

      const players = await this.playerService.getPlayerByUserId(user.id);
      if (players.length !== 0) {
        busyUsers.push(user);
      }
      users.push(user);
    }

    if (busyUsers.length !== 0) {
      throw new ConflictException(busyUsers);
    }

    return users;
  }
}

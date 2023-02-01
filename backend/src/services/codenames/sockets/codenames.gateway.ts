import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {EClientCommand, EServerCommand} from './commands';
import {SessionService} from '../children/session/session.service';
import type {TAuthorizedSocket} from '../../../app';
import {UserService} from '../../user/user.service';
import {PlayerService} from '../children/player/player.service';
import {CodenamesGatewayService} from './codenames.gateway.service';
import {WordDto} from '../children/word/word.dto';
import {JwtAuthGuard} from '../../auth/jwt-auth-guard';
import {UseGuards} from '@nestjs/common';
import {AuthService} from '../../auth/auth.service';
import {UserDto} from '../../user/user.dto';
import {InitGameDto} from './dto/init-game-dto';
import {ERole} from '../children/role/role.enum';

@WebSocketGateway(7001, {
  cors: {
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  }
})
export class CodenamesGateway {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly codenamesGatewayService: CodenamesGatewayService,
    private readonly authService: AuthService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket): Promise<void> {
    console.log('connect');

    const authToken = client.handshake.auth.token;

    if (!authToken) {
      client.disconnect();
      return;
    }

    const [bearer, token] = authToken.split(' ');

    try {
      const user: UserDto = await this.authService.getUserByToken(token);

      const initGameDto: InitGameDto = await this.codenamesGatewayService.initGame(user);

      client.emit(EServerCommand.INIT_GAME, initGameDto);
    } catch {
      client.emit(EServerCommand.UNAUTHORIZED);
    }
  }

  handleDisconnect(client): any {
    console.log('disconnect');
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.JOIN_ROOM)
  async joinRoom(
    @ConnectedSocket() socket: TAuthorizedSocket,
    @MessageBody('room') room: number
  ): Promise<string> {
    const isValidSession = await this.codenamesGatewayService.isValidSession(room);

    if (!isValidSession) {
      socket.emit(EServerCommand.ERROR_JOIN_ROOM);
      return;
    }

    socket.join(room.toString());

    return 'ok';
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.MAKE_TIP)
  async makeTip(
    @ConnectedSocket() socket: TAuthorizedSocket,
    @MessageBody('tip') tip: string,
    @MessageBody('count') count: number,
  ): Promise<void> {
    const room: number | undefined = Number(Array.from(socket.rooms)[1]);

    if (!room) {
      return;
    }

    await this.codenamesGatewayService.makeTip(socket.user, room, tip);

    const initGameDto: InitGameDto = await this.codenamesGatewayService.initGame(socket.user);

    delete initGameDto.currentPlayer;

    this.server
      .to(room.toString())
      .emit(EServerCommand.UPDATE_STATE, initGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.MAKE_MOVE)
  async makeMove(
    @ConnectedSocket() socket: TAuthorizedSocket,
    @MessageBody('word') word: WordDto
  ): Promise<void> {
    const room: number | undefined = Number(Array.from(socket.rooms)[1]);

    if (!room) {
      return;
    }

    await this.codenamesGatewayService.makeMove(socket.user, room, word);

    const initGameDto: InitGameDto = await this.codenamesGatewayService.initGame(socket.user);

    delete initGameDto.currentPlayer;

    const isGameOverByCardsLimit: boolean = await this.codenamesGatewayService.isGameOverByCardsLimit(initGameDto);
    const isGameOverByOpeningKiller: boolean = await this.codenamesGatewayService.isGameOverByCardsLimit(initGameDto);

    if (isGameOverByCardsLimit) {
      this.server
        .to(room.toString())
        .emit(EServerCommand.GAME_OVER, {winner: initGameDto.prevMove});
    }
    if (isGameOverByOpeningKiller) {
      this.server
        .to(room.toString())
        .emit(EServerCommand.GAME_OVER, {winner: `${(initGameDto.move as string).split('_')[0]}_AGENT`});
    }

    this.server
      .to(room.toString())
      .emit(EServerCommand.UPDATE_STATE, initGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.GET_KEY)
  async getKey(@ConnectedSocket() socket: TAuthorizedSocket): Promise<string> {
    const room: number | undefined = Number(Array.from(socket.rooms)[1]);

    if (!room) {
      return;
    }

    return await this.codenamesGatewayService.getKey(room);
  }
}

import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {EClientCommand, EServerCommand} from './commands';
import {SessionService} from '../children/session/session.service';
import {ERole} from '../children/role/role.enum';
import {TAuthorizedSocket} from '../../../app';
import {UserService} from '../../user/user.service';
import {PlayerService} from '../children/player/player.service';
import {CodenamesGatewayService} from './codenames.gateway.service';
import {CodenamesService} from '../codenames.service';
import {WordDto} from '../children/word/word.dto';


@WebSocketGateway(7001)
export class CodenamesGateway {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly codenamesGatewayService: CodenamesGatewayService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client): any {
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', 'govno');
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.JOIN_ROOM)
  async joinRoom(
    @ConnectedSocket() socket: TAuthorizedSocket,
    @MessageBody('room') room: number
  ): Promise<void> {
    const isValidSession = this.codenamesGatewayService.isValidSession(room);

    if (!isValidSession) {
      socket.emit(EServerCommand.ERROR_JOIN_ROOM);
      return;
    }

    socket.join(room.toString());
  }

  @SubscribeMessage(EClientCommand.REQUEST_PLAYER_INFO)
  requestPlayerInfo(socket): void {
    this.server.to('gigi').emit('sss', 'govno');
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.MAKE_TIP)
  async makeTip(
    @ConnectedSocket() socket: TAuthorizedSocket,
    @MessageBody('tip') tip: string
  ): Promise<void> {
    const room = socket.rooms[1];

    if (!room) {
      return;
    }

    await this.codenamesGatewayService.makeTip(socket.user, room, tip);
  }

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage(EClientCommand.MAKE_MOVE)
  async makeMove(
    @ConnectedSocket() socket: TAuthorizedSocket,
    @MessageBody('word') word: WordDto
  ): Promise<void> {
    const room = socket.rooms[1];

    if (!room) {
      return;
    }

    await this.codenamesGatewayService.makeMove(socket.user, room, word);
  }
}

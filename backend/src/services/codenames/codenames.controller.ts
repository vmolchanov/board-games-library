import {Controller, Get, Post, Put, Delete, Body} from '@nestjs/common';
import {CodenamesService} from './codenames.service';
import {InitGameDto} from './codenames.dto';


@Controller('/')
export class CodenamesController {
  constructor(private readonly codenamesService: CodenamesService,) {}

  @Post('/init')
  async initializeGame(@Body() initGameDto: InitGameDto): Promise<void> {
    await this.codenamesService.initializeGame(initGameDto.players, initGameDto.chatId);
  }
}

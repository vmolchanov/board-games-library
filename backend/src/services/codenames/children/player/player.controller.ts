import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {PlayerService} from './player.service';
import {Player} from './player.model';
import {PlayerDto} from './player.dto';


@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playerService.getAllPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param('id') id: number): Promise<Player> {
    return await this.playerService.getPlayerById(id);
  }

  @Post()
  async addPlayer(@Body() playerDto: PlayerDto): Promise<Player> {
    return await this.playerService.addPlayer(playerDto);
  }

  @Put()
  async editPlayer(@Body() playerDto: PlayerDto): Promise<Player> {
    return await this.playerService.editPlayer(playerDto);
  }

  @Delete()
  async deletePlayer(@Body('id') id: number): Promise<void> {
    await this.playerService.deletePlayer(id);
  }
}

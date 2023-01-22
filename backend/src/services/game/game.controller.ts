import {ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {GameService} from './game.service';
import {Game} from './game.model';
import {GameDto} from './game.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getAllGames(): Promise<Game[]> {
    return await this.gameService.getAllGames();
  }

  @Get(':gameId')
  async getGameById(@Param('gameId') gameId): Promise<Game> {
    return await this.gameService.getGameById(gameId);
  }

  @Post()
  async createGame(@Body() gameDto: GameDto): Promise<Game> {
    return await this.gameService.createGame(gameDto);
  }

  @Post('/list')
  async createGames(@Body() gameDtos: GameDto[]): Promise<Game[]> {
    return await this.gameService.createGames(gameDtos);
  }

  @Put()
  async editGame(@Body() gameDto: GameDto): Promise<Game> {
    return await this.gameService.editGame(gameDto);
  }

  @Delete()
  async deleteGame(@Body('id') gameId: string): Promise<void> {
    return await this.gameService.deleteGame(gameId);
  }
}

import {ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {GameService} from './game.service';
import {JwtAuthGuard} from '../auth/jwt-auth-guard';
import {Game} from './game.model';
import {GameDto} from './game.dto';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllGames(): Promise<Game[]> {
    return await this.gameService.getAllGames();
  }

  @Get(':gameId')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async editGame(@Body() gameDto: GameDto): Promise<Game> {
    return await this.gameService.editGame(gameDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteGame(@Body('id') gameId: string): Promise<void> {
    return await this.gameService.deleteGame(gameId);
  }
}

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
import {JwtAuthGuard} from '../auth/jwt-auth-guard';
import {ChatGameService} from './chat-game.service';
import {ChatGame} from './chat-game.model';
import {ChatGameDto} from './chat-game.dto';

@ApiTags('chatGame')
@Controller('chatGame')
export class ChatGameController {
  constructor(private readonly chatGameService: ChatGameService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllChatGames(): Promise<ChatGame[]> {
    return await this.chatGameService.getAllChatGames();
  }

  @Get(':chatGameId')
  @UseGuards(JwtAuthGuard)
  async getChatGameById(@Param('chatGameId') chatGameId): Promise<ChatGame> {
    return await this.chatGameService.getChatGameById(chatGameId);
  }

  @Post()
  async createChatGame(@Body() chatGameDto: ChatGameDto): Promise<ChatGame> {
    return await this.chatGameService.createChatGame(chatGameDto);
  }

  @Post('/list')
  async createChatGames(@Body() chatGameDtos: ChatGameDto[]): Promise<ChatGame[]> {
    return await this.chatGameService.createChatGames(chatGameDtos);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async editChatGame(@Body() chatGameDto: ChatGameDto): Promise<ChatGame> {
    return await this.chatGameService.editChatGame(chatGameDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteChatGame(@Body('id') chatGameId: string): Promise<void> {
    return await this.chatGameService.deleteChatGame(chatGameId);
  }
}

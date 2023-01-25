import {ApiTags} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query
} from '@nestjs/common';
import {ChatGameService} from './chat-game.service';
import {ChatGame} from './chat-game.model';
import {ChatGameDto} from './chat-game.dto';

@ApiTags('chatGame')
@Controller('chat-game')
export class ChatGameController {
  constructor(private readonly chatGameService: ChatGameService) {}

  @Get()
  async getAllChatGames(): Promise<ChatGame[]> {
    return await this.chatGameService.getAllChatGames();
  }

  @Get('/params')
  async getChatGameByParams(@Query() data: Record<string, string | number | boolean>): Promise<ChatGame[]> {
    return await this.chatGameService.getChatGameByParams(data);
  }

  @Get(':chatGameId')
  async getChatGameById(@Param('chatGameId') chatGameId: number): Promise<ChatGame> {
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
  async editChatGame(@Body() chatGameDto: ChatGameDto): Promise<ChatGame> {
    return await this.chatGameService.editChatGame(chatGameDto);
  }

  @Delete()
  async deleteChatGame(@Body('id') chatGameId: number): Promise<void> {
    return await this.chatGameService.deleteChatGame(chatGameId);
  }

  @Delete('/list')
  async deleteChatGames(@Body('ids') ids: number[]): Promise<void> {
    await this.chatGameService.deleteChatGames(ids);
  }
}

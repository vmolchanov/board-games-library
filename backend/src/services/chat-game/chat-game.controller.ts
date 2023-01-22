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
import {ChatGameService} from './chat-game.service';
import {ChatGame} from './chat-game.model';
import {ChatGameDto} from './chat-game.dto';

@ApiTags('chatGame')
@Controller('chatGame')
export class ChatGameController {
  constructor(private readonly chatGameService: ChatGameService) {}

  @Get()
  async getAllChatGames(): Promise<ChatGame[]> {
    return await this.chatGameService.getAllChatGames();
  }

  @Get(':chatGameId')
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
  async editChatGame(@Body() chatGameDto: ChatGameDto): Promise<ChatGame> {
    return await this.chatGameService.editChatGame(chatGameDto);
  }

  @Delete()
  async deleteChatGame(@Body('id') chatGameId: string): Promise<void> {
    return await this.chatGameService.deleteChatGame(chatGameId);
  }
}

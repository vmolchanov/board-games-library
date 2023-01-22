import {ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ChatService} from './chat.service';
import {Chat} from './chat.model';
import {ChatDto} from './chat.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChats(): Promise<Chat[]> {
    return await this.chatService.getAllChats();
  }

  @Get(':chatId')
  async getChatById(@Param('chatId') chatId): Promise<Chat> {
    return await this.chatService.getChatById(chatId);
  }

  @Post()
  async createChat(@Body() chatDto: ChatDto): Promise<Chat> {
    return await this.chatService.createChat(chatDto);
  }

  @Post('/list')
  async createChats(@Body() chatDtos: ChatDto[]): Promise<Chat[]> {
    return await this.chatService.createChats(chatDtos);
  }

  @Put()
  async editChat(@Body() chatDto: ChatDto): Promise<Chat> {
    return await this.chatService.editChat(chatDto);
  }

  @Delete()
  async deleteChat(@Body('id') chatId: string): Promise<void> {
    return await this.chatService.deleteChat(chatId);
  }
}

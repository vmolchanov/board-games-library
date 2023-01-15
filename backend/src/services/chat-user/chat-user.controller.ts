import {ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth-guard';
import {ChatUserService} from './chat-user.service';
import {ChatUser} from './chat-user.model';
import {ChatUserDto} from './chat-user.dto';

@ApiTags('chatUser')
@Controller('chatUser')
export class ChatUserController {
  constructor(private readonly chatUserService: ChatUserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllChatUsers(): Promise<ChatUser[]> {
    return await this.chatUserService.getAllChatUsers();
  }

  @Get(':chatUserId')
  @UseGuards(JwtAuthGuard)
  async getChatUserById(@Param('chatUserId') chatUserId): Promise<ChatUser> {
    return await this.chatUserService.getChatUserById(chatUserId);
  }

  @Post()
  async createChatUser(@Body() chatUserDto: ChatUserDto): Promise<ChatUser> {
    return await this.chatUserService.createChatUser(chatUserDto);
  }

  @Post('/list')
  async createChatUsers(@Body() chatUserDtos: ChatUserDto[]): Promise<ChatUser[]> {
    return await this.chatUserService.createChatUsers(chatUserDtos);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async editChatUser(@Body() chatUserDto: ChatUserDto): Promise<ChatUser> {
    return await this.chatUserService.editChatUser(chatUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteChatUser(@Body('id') chatUserId: string): Promise<void> {
    return await this.chatUserService.deleteChatUser(chatUserId);
  }
}

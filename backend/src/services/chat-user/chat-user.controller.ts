import {ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ChatUserService} from './chat-user.service';
import {ChatUser} from './chat-user.model';
import {ChatUserDto} from './chat-user.dto';

@ApiTags('chatUser')
@Controller('chat-user')
export class ChatUserController {
  constructor(private readonly chatUserService: ChatUserService) {}

  @Get()
  async getAllChatUsers(): Promise<ChatUser[]> {
    return await this.chatUserService.getAllChatUsers();
  }

  @Get('/params')
  async getChatUserByParams(@Query() data: Record<string, string | number | boolean>): Promise<ChatUser[]> {
    return await this.chatUserService.getChatUserByParams(data);
  }

  @Get(':chatUserId')
  async getChatUserById(@Param('chatUserId') chatUserId: number): Promise<ChatUser> {
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
  async editChatUser(@Body() chatUserDto: ChatUserDto): Promise<ChatUser> {
    return await this.chatUserService.editChatUser(chatUserDto);
  }

  @Delete()
  async deleteChatUser(@Body('id') chatUserId: string): Promise<void> {
    return await this.chatUserService.deleteChatUser(chatUserId);
  }

  @Delete('/list')
  async deleteChatUsers(@Body('ids') ids: number[]): Promise<void> {
    await this.chatUserService.deleteChatUsers(ids);
  }
}

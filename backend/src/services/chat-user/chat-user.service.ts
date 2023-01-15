import {Injectable} from '@nestjs/common';
import {DbService} from '../../utils/db';
import {InjectModel} from '@nestjs/sequelize';
import {ChatUserDto} from './chat-user.dto';
import {ChatUser} from './chat-user.model';

@Injectable()
export class ChatUserService {
  private _dbService: DbService<ChatUserDto, ChatUser>;

  constructor(@InjectModel(ChatUser) private chatUserModel: typeof ChatUser) {
    this._dbService = new DbService<ChatUserDto, ChatUser>(this.chatUserModel);
  }

  async getChatUserById(id: number): Promise<ChatUser> {
    return await this._dbService.getEntityById(id);
  }

  async getAllChatUsers(): Promise<ChatUser[]> {
    return await this._dbService.getAllEntities();
  }

  async createChatUser(chatUserDto: ChatUserDto): Promise<ChatUser> {
    return await this._dbService.createEntity(chatUserDto, {
      chatId: chatUserDto.chatId,
      userId: chatUserDto.userId,
    });
  }

  async createChatUsers(chatUserDtos: ChatUserDto[]): Promise<ChatUser[]> {
    const queries = [];

    chatUserDtos.forEach(chatUserDto => {
      queries.push(
        this._dbService.createEntity(chatUserDto, {
          chatId: chatUserDto.chatId,
          userId: chatUserDto.userId,
        })
      );
    });

    return await Promise.all(queries);
  }

  async editChatUser(chatUserDto: ChatUserDto): Promise<ChatUser> {
    return await this._dbService.updateEntity(chatUserDto);
  }

  async deleteChatUser(id: string): Promise<void> {
    await this._dbService.deleteEntity(id);
  }
}

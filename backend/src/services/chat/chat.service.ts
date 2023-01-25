import {Injectable} from '@nestjs/common';
import {DbService} from '../../utils/db';
import {ChatDto} from './chat.dto';
import {Chat} from './chat.model';
import {InjectModel} from '@nestjs/sequelize';

@Injectable()
export class ChatService {
  private _dbService: DbService<ChatDto, Chat>;

  constructor(@InjectModel(Chat) private chatModel: typeof Chat) {
    this._dbService = new DbService<ChatDto, Chat>(this.chatModel);
  }

  async getChatById(id: number): Promise<Chat> {
    return await this._dbService.getEntityById(id);
  }

  async getChatByParams(params: Record<string, string | number | boolean>): Promise<Chat[]> {
    return await this._dbService.find(params);
  }

  async getAllChats(): Promise<Chat[]> {
    return await this._dbService.getAllEntities();
  }

  async createChat(chatDto: ChatDto): Promise<Chat> {
    return await this._dbService.createEntity(chatDto, {chatId: chatDto.chatId});
  }

  async createChats(chatDtos: ChatDto[]): Promise<Chat[]> {
    const queries = [];

    chatDtos.forEach(chatDto => {
      queries.push(
        this._dbService.createEntity(chatDto, {chatId: chatDto.chatId})
      );
    });

    return await Promise.all(queries);
  }

  async editChat(chatDto: ChatDto): Promise<Chat> {
    return await this._dbService.updateEntity(chatDto);
  }

  async deleteChat(id: string): Promise<void> {
    await this._dbService.deleteEntity(id);
  }
}

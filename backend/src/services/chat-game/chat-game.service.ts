import {Injectable} from '@nestjs/common';
import {DbService} from '../../utils/db';
import {InjectModel} from '@nestjs/sequelize';
import {ChatGameDto} from './chat-game.dto';
import {ChatGame} from './chat-game.model';

@Injectable()
export class ChatGameService {
  private _dbService: DbService<ChatGameDto, ChatGame>;

  constructor(@InjectModel(ChatGame) private chatGameModel: typeof ChatGame) {
    this._dbService = new DbService<ChatGameDto, ChatGame>(this.chatGameModel);
  }

  async getChatGameById(id: number): Promise<ChatGame> {
    return await this._dbService.getEntityById(id);
  }

  async getAllChatGames(): Promise<ChatGame[]> {
    return await this._dbService.getAllEntities();
  }

  async getChatGameByParams(params: Record<string, string | number | boolean>): Promise<ChatGame[]> {
    return await this._dbService.find(params);
  }

  async createChatGame(chatGameDto: ChatGameDto): Promise<ChatGame> {
    return await this._dbService.createEntity(chatGameDto, {
      chatId: chatGameDto.chatId,
      gameId: chatGameDto.gameId,
    });
  }

  async createChatGames(chatGameDtos: ChatGameDto[]): Promise<ChatGame[]> {
    const queries = [];

    chatGameDtos.forEach(chatGameDto => {
      queries.push(
        this._dbService.createEntity(chatGameDto, {
          chatId: chatGameDto.chatId,
          gameId: chatGameDto.gameId,
        })
      );
    });

    return await Promise.all(queries);
  }

  async editChatGame(chatGameDto: ChatGameDto): Promise<ChatGame> {
    return await this._dbService.updateEntity(chatGameDto);
  }

  async deleteChatGame(id: number): Promise<void> {
    await this._dbService.deleteEntity(id);
  }

  async deleteChatGames(ids: number[]): Promise<void> {
    const queries: Promise<void>[] = ids.map((id: number) => this._dbService.deleteEntity(id));
    await Promise.all(queries);
  }
}

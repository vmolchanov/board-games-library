import {Injectable} from '@nestjs/common';
import {DbService} from '../../utils/db';
import {InjectModel} from '@nestjs/sequelize';
import {Game} from './game.model';
import {GameDto} from './game.dto';

@Injectable()
export class GameService {
  private _dbService: DbService<GameDto, Game>;

  constructor(@InjectModel(Game) private gameModel: typeof Game) {
    this._dbService = new DbService<GameDto, Game>(this.gameModel);
  }

  async getGameById(id: number): Promise<Game> {
    return await this._dbService.getEntityById(id);
  }

  async getAllGames(): Promise<Game[]> {
    return await this._dbService.getAllEntities();
  }

  async createGame(gameDto: GameDto): Promise<Game> {
    return await this._dbService.createEntity(gameDto, {title: gameDto.title});
  }

  async createGames(gameDtos: GameDto[]): Promise<Game[]> {
    const queries = [];

    gameDtos.forEach(gameDto => {
      queries.push(
        this._dbService.createEntity(gameDto, {title: gameDto.title})
      );
    });

    return await Promise.all(queries);
  }

  async editGame(gameDto: GameDto): Promise<Game> {
    return await this._dbService.updateEntity(gameDto);
  }

  async deleteGame(id: string): Promise<void> {
    await this._dbService.deleteEntity(id);
  }
}

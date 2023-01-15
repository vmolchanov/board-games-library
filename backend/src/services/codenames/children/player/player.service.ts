import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Player} from './player.model';
import {DbService} from '../../../../utils/db';
import {PlayerDto} from './player.dto';

@Injectable()
export class PlayerService {
  private _dbService: DbService<PlayerDto, Player>;

  constructor(@InjectModel(Player) private playerModel: typeof Player) {
    this._dbService = new DbService<PlayerDto, Player>(this.playerModel);
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this._dbService.getAllEntities();
  }

  async getPlayerById(id: number): Promise<Player> {
    return await this._dbService.getEntityById(id);
  }

  async getPlayerByUserId(userId: number): Promise<Player[]> {
    return await this._dbService.find({userId});
  }

  async addPlayer(playerDto: PlayerDto): Promise<Player> {
    return await this._dbService.createEntity(playerDto);
  }

  async editPlayer(playerDto: PlayerDto): Promise<Player> {
    return await this._dbService.updateEntity(playerDto);
  }

  async deletePlayer(id: number): Promise<void> {
    return await this._dbService.deleteEntity(id);
  }
}

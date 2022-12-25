import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {SessionWord} from './session-word.model';
import {DbService} from '../../../../utils/db';
import {SessionWordDto} from './session-word.dto';
import {ISessionWordParams} from './session-word';


@Injectable()
export class SessionWordService {
  private _dbService: DbService<SessionWordDto, SessionWord>

  constructor(@InjectModel(SessionWord) private sessionWordModel: typeof SessionWord) {
    this._dbService = new DbService<SessionWordDto, SessionWord>(this.sessionWordModel);
  }

  async getAllSessionWords(): Promise<SessionWord[]> {
    return await this._dbService.getAllEntities();
  }

  async getSessionWordById(id: number): Promise<SessionWord> {
    return await this._dbService.getEntityById(id);
  }

  async getSessionWordByParams(params: ISessionWordParams): Promise<SessionWord[]> {
    return await this._dbService.find(params);
  }

  async addSessionWord(sessionWordDto: SessionWordDto): Promise<SessionWord> {
    return await this._dbService.createEntity(sessionWordDto);
  }

  async editSessionWord(sessionWordDto: SessionWordDto): Promise<SessionWord> {
    return await this._dbService.updateEntity(sessionWordDto);
  }

  async deleteSessionWord(id: number): Promise<void> {
    await this._dbService.deleteEntity(id);
  }
}

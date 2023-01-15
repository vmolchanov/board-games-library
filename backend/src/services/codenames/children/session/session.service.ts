import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Session} from './session.model';
import {DbService} from '../../../../utils/db';
import {SessionDto} from './session.dto';
import {THero} from '../../codenames';

@Injectable()
export class SessionService {
  private _dbService: DbService<SessionDto, Session>

  constructor(@InjectModel(Session) private sessionModel: typeof Session) {
    this._dbService = new DbService<SessionDto, Session>(this.sessionModel);
  }

  async getAllSessions(): Promise<Session[]> {
    return await this._dbService.getAllEntities();
  }

  async getSessionById(id: number): Promise<Session> {
    return await this._dbService.getEntityById(id);
  }

  async addSession(sessionDto: SessionDto): Promise<Session> {
    return await this._dbService.createEntity(sessionDto);
  }

  async editSession(sessionDto: SessionDto): Promise<Session> {
    return await this._dbService.updateEntity(sessionDto);
  }

  async deleteSession(id: number): Promise<void> {
    return await this._dbService.deleteEntity(id);
  }

  getHeroInKeyByPosition(key: string, position: number): THero {
    const sliced = key.slice(2);
    const replaced = sliced.replace(/,/g, '');
    return replaced[position] as THero;
  }
}

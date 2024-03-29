import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {User} from './user.model';
import {UserDto} from './user.dto';
import {DbService} from '../../utils/db';

@Injectable()
export class UserService {
  private _dbService: DbService<UserDto, User>;

  constructor(@InjectModel(User) private userModel: typeof User) {
    this._dbService = new DbService<UserDto, User>(this.userModel);
  }

  async getUserById(id: number): Promise<User> {
    return await this._dbService.getEntityById(id);
  }

  async getUserByTelegramId(telegramId): Promise<User | null> {
    return await this._dbService.findOne({telegramId});
  }

  async getUserByParams(params: Record<string, string | number | boolean>): Promise<User[]> {
    return await this._dbService.find(params);
  }

  async isUserExist(id: number): Promise<boolean> {
    const user = await this.getUserById(id);
    return user !== null;
  }

  async getAllUsers(): Promise<User[]> {
    return await this._dbService.getAllEntities();
  }

  async createUser(userDto: UserDto): Promise<User> {
    return await this._dbService.createEntity(userDto, {telegramId: userDto.telegramId});
  }

  async createUsers(userDtos: UserDto[]): Promise<User[]> {
    const queries = [];

    userDtos.forEach(userDto => {
      queries.push(
        this._dbService.createEntity(userDto, {telegramId: userDto.telegramId})
      );
    });

    return await Promise.all(queries);
  }

  async editUser(userDto: UserDto): Promise<User> {
    return await this._dbService.updateEntity(userDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this._dbService.deleteEntity(id);
  }
}

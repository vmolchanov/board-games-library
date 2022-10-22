import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {User} from './user.model';
import {UserDto} from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async isUserExist(id: string): Promise<boolean> {
    const user = await this.userModel.findByPk(id);
    return user !== null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async createUser(userDto: UserDto): Promise<User> {
    if (!userDto.telegramId || !userDto.firstName) {
      throw new BadRequestException('Отсутствуют обязательные поля');
    }

    const candidate = await this.userModel.findByPk(userDto.telegramId);
    if (candidate) {
      throw new ConflictException('Такой пользователь уже существует')
    }

    return await this.userModel.create(userDto);
  }

  async editUser(userDto: UserDto): Promise<User> {
    const user = await this.userModel.findByPk(userDto.telegramId);

    if (!user) {
      throw new NotFoundException('Пользователя не существует');
    }

    return await user.update(userDto);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Такого пользователя не существует');
    }

    await user.destroy();
  }
}

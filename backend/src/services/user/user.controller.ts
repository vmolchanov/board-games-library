import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body, Query
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {UserService} from './user.service';
import {UserDto} from './user.dto';
import {User} from './user.model';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/params')
  async getUserByParams(@Query() data: Record<string, string | number | boolean>): Promise<User[]> {
    return await this.userService.getUserByParams(data);
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.createUser(userDto);
  }

  @Post('/list')
  async createUsers(@Body() userDtos: UserDto[]): Promise<User[]> {
    return await this.userService.createUsers(userDtos);
  }

  @Put()
  async editUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.editUser(userDto);
  }

  @Delete()
  async deleteUser(@Body('id') userid: string): Promise<void> {
    return await this.userService.deleteUser(userid);
  }
}

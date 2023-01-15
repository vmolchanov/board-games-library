import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {UserService} from './user.service';
import {UserDto} from './user.dto';
import {User} from './user.model';
import {JwtAuthGuard} from '../auth/jwt-auth-guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('userId') userId): Promise<User> {
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
  @UseGuards(JwtAuthGuard)
  async editUser(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.editUser(userDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body('id') userid: string): Promise<void> {
    return await this.userService.deleteUser(userid);
  }
}

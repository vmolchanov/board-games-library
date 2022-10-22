import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {UserService} from './user.service';
import {UserDto} from './dto/user.dto';
import {User} from './user.model';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }


  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('userId') userId) {
    return this.userService.getUserById(userId);
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }


  @Put()
  @UseGuards(JwtAuthGuard)
  async editUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.editUser(userDto);
  }


  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body('id') userid: string): Promise<void> {
    return this.userService.deleteUser(userid);
  }
}

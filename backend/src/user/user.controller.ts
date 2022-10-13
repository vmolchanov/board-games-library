import {Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './dto/user.dto';
import {User} from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId) {
    return this.userService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Put()
  async editUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.editUser(userDto);
  }

  @Delete()
  async deleteUser(@Body('id') userid: string): Promise<void> {
    return this.userService.deleteUser(userid);
  }
}

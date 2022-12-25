import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {SessionService} from './session.service';
import {Session} from './session.model';
import {SessionDto} from './session.dto';


@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getAllSessions(): Promise<Session[]> {
    return await this.sessionService.getAllSessions();
  }

  @Get(':id')
  async getSessionById(@Param('id') id: number): Promise<Session> {
    return await this.sessionService.getSessionById(id);
  }

  @Post()
  async addSession(@Body() sessionDto: SessionDto): Promise<Session> {
    return await this.sessionService.addSession(sessionDto);
  }

  @Put()
  async editSession(@Body() sessionDto: SessionDto): Promise<Session> {
    return await this.sessionService.editSession(sessionDto);
  }

  @Delete()
  async deleteSession(@Body('id') id: number): Promise<void> {
    return await this.sessionService.deleteSession(id);
  }
}

import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {SessionWordService} from './session-word.service';
import {SessionWord} from './session-word.model';
import {SessionWordDto} from './session-word.dto';
import {DbService} from '../../../../utils/db';

@Controller()
export class SessionWordController {
  private _dbService: DbService<SessionWordDto, SessionWord>;

  constructor(private readonly sessionWordService: SessionWordService) {
    this._dbService = new DbService<SessionWordDto, SessionWord>(this.sessionWordService);
  }

  @Get()
  async getAllSessionWords(): Promise<SessionWord[]> {
    return await this.sessionWordService.getAllSessionWords();
  }

  @Get(':id')
  async getSessionWordById(@Param('id') id: number): Promise<SessionWord> {
    return await this.sessionWordService.getSessionWordById(id);
  }

  @Post()
  async addSessionWord(@Body() sessionWord: SessionWordDto): Promise<SessionWord> {
    return await this.sessionWordService.addSessionWord(sessionWord);
  }

  @Put()
  async editSessionWord(@Body() sessionWord: SessionWordDto): Promise<SessionWord> {
    return await this.sessionWordService.editSessionWord(sessionWord);
  }

  @Delete()
  async deleteSessionWord(@Body('id') id: number) {
    await this.sessionWordService.deleteSessionWord(id);
  }
}

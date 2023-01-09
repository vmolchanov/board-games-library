import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {WordService} from './word.service';
import {Word} from './word.model';
import {WordDto} from './word.dto';


@Controller()
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  async getAllWords(): Promise<Word[]> {
    return await this.wordService.getAllWords();
  }

  @Get(':id')
  async getWordById(@Param('id') id: number): Promise<Word> {
    return await this.wordService.getWordById(id);
  }

  @Post()
  async addWord(@Body() wordDto: WordDto): Promise<Word> {
    return await this.wordService.addWord(wordDto);
  }

  @Post('/list')
  async addWords(@Body() wordDtos: WordDto[]): Promise<Word[]> {
    return await this.wordService.addWords(wordDtos);
  }

  @Put()
  async editWord(@Body() wordDto: WordDto): Promise<Word> {
    return await this.wordService.editWord(wordDto);
  }

  @Delete()
  async deleteWord(@Body('id') id: number): Promise<void> {
    await this.wordService.deleteWord(id);
  }
}

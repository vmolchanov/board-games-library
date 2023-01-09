import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

import {Word} from './word.model';
import {DbService} from '../../../../utils/db';
import {WordDto} from './word.dto';


@Injectable()
export class WordService {
  private _dbService: DbService<WordDto, Word>;

  constructor(@InjectModel(Word) private wordModel: typeof Word) {
    this._dbService = new DbService<WordDto, Word>(this.wordModel);
  }

  async getAllWords(): Promise<Word[]> {
    return await this._dbService.getAllEntities();
  }

  async getWordById(id: number): Promise<Word> {
    return await this._dbService.getEntityById(id);
  }

  async addWord(wordDto: WordDto): Promise<Word> {
    return await this._dbService.createEntity(wordDto, {value: wordDto.value});
  }

  async addWords(wordDtos: WordDto[]): Promise<Word[]> {
    const queries = [];

    wordDtos.forEach(wordDto => {
      queries.push(
        this._dbService.createEntity(wordDto, {value: wordDto.value})
      );
    });

    return await Promise.all(queries);
  }

  async editWord(wordDto: WordDto): Promise<Word> {
    return await this._dbService.updateEntity(wordDto);
  }

  async deleteWord(id: number): Promise<void> {
    await this._dbService.deleteEntity(id);
  }
}

import {ConflictException, NotFoundException} from '@nestjs/common';
import type {TEditDto} from '../app';
import {Model} from 'sequelize-typescript';

export class DbService<DtoType, ModelType extends Model> {
  private _model: any;

  constructor(model: ThisType<ModelType>) {
    this._model = model;
  }

  async getEntityById(id: number | string): Promise<ModelType> {
    return (await this._model.findByPk(id)).dataValues;
  }

  async getAllEntities(): Promise<ModelType[]> {
    return await this._model.findAll();
  }

  /**
   * Создает объект в базе данных
   * @param dto – объект, который будет сохранен в базу
   * @param where - параметры объекта для проверки его существования в базе
   * @throws {ConflictException} - сохраняемый объект уже существует в базе
   * @return Сохраненный объект
   */
  async createEntity(dto: DtoType, where: object = {}): Promise<ModelType> {
    if (Object.keys(where).length !== 0) {
      const candidate = await this._model.findOne({
        where,
        rejectOnEmpty: false,
      });
      if (candidate) {
        throw new ConflictException('Такой объект уже существует');
      }
    }
    return this._model.create(dto);
  }

  async updateEntity(dto: TEditDto<DtoType>): Promise<ModelType> {
    const candidate = await this._model.findByPk(dto.id);

    if (!candidate) {
      throw new NotFoundException('Объекта не существует');
    }

    return candidate.update(dto);
  }

  async deleteEntity(id: number | string): Promise<void> {
    const candidate = await this._model.findByPk(id);

    if (!candidate) {
      throw new NotFoundException('Такого объекта не существует');
    }

    await candidate.destroy();
  }

  async findOne(where: object = {}): Promise<ModelType> {
    const obj: any = await this._model.findOne({
      where,
      rejectOnEmpty: false,
    });
    return obj.dataValues;
  }

  async find(where: object = {}): Promise<ModelType[]> {
    return (await this._model.findAll({
      where,
      rejectOnEmpty: false,
    })).map(obj => obj.dataValues);
  }
}

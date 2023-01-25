import axios, {AxiosResponse} from 'axios';
import {EHttpServiceEndpoint} from '@services/http-service/http-service.constant';

// console.log('env', process.env.BOT_TOKEN);

// const baseUrl = process.env.BACKEND_URL;

export class HttpService<M> {
  private readonly _baseUrl: string;

  constructor(private _entity: EHttpServiceEndpoint) {
    this._baseUrl = process.env.BACKEND_URL;
  }

  public async findAll(): Promise<M[]> {
    const response: AxiosResponse = await axios(`${this._baseUrl}/${this._entity}`);
    return response.data;
  }

  public async findById(id: number): Promise<M | null> {
    const response: AxiosResponse = await axios(`${this._baseUrl}/${this._entity}/${id}`);
    return response.data;
  }

  public async findByParams(params: Record<string, string | number | boolean>): Promise<M[]> {
    const url = `${this._baseUrl}/${this._entity}/params`;
    const response: AxiosResponse = await axios(url, {
      params,
    });

    return response.data;
  }

  public async create(data: M): Promise<M> {
    const url = `${this._baseUrl}/${this._entity}`;
    const response: AxiosResponse = await axios(url, {
      method: 'POST',
      data,
    });
    return response.data;
  }

  public async delete(id: number): Promise<void> {
    const url = `${this._baseUrl}/${this._entity}`;
    await axios(url, {
      method: 'DELETE',
      data: {id},
    });
  }

  public async deleteList(ids: number[]): Promise<void> {
    const url = `${this._baseUrl}/${this._entity}/list`;
    await axios(url, {
      method: 'DELETE',
      data: {ids},
    });
  }
}

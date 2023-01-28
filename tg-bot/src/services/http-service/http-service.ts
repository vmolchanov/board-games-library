import axios from 'axios';
import type {AxiosResponse} from 'axios';
import {EHttpServiceEndpoint} from '@services/http-service/http-service.constant';

export class HttpService<M = unknown> {
  private readonly _baseUrl: string;

  constructor(private _entity: EHttpServiceEndpoint) {
    this._baseUrl = process.env.BACKEND_URL;
  }

  public async findAll(): Promise<M[]> {
    const url: string = `${this._baseUrl}/${this._entity}`;
    const response: AxiosResponse = await axios(url);
    return response.data;
  }

  public async findById(id: number): Promise<M | null> {
    const url: string = `${this._baseUrl}/${this._entity}/${id}`;
    const response: AxiosResponse = await axios(url);
    return response.data;
  }

  public async findByParams(params: Record<string, string | number | boolean>): Promise<M[]> {
    const url: string = `${this._baseUrl}/${this._entity}/params`;
    const response: AxiosResponse = await axios(url, {
      params,
    });

    return response.data;
  }

  public async create(data: M): Promise<M> {
    const url: string = `${this._baseUrl}/${this._entity}`;
    const response: AxiosResponse = await axios(url, {
      method: 'POST',
      data,
    });
    return response.data;
  }

  public async initGame<P>(data: P): Promise<M> {
    const url: string = `${this._baseUrl}/${this._entity}/init`;
    const response: AxiosResponse = await axios(url, {
      method: 'POST',
      data,
    });
    return response.data;
  }

  public async delete(id: number): Promise<void> {
    const url: string = `${this._baseUrl}/${this._entity}`;
    await axios(url, {
      method: 'DELETE',
      data: {id},
    });
  }

  public async deleteList(ids: number[]): Promise<void> {
    const url: string = `${this._baseUrl}/${this._entity}/list`;
    await axios(url, {
      method: 'DELETE',
      data: {ids},
    });
  }
}

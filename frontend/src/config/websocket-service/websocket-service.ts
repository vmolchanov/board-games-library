import io, {Socket} from 'socket.io-client';
import {ManagerOptions} from 'socket.io-client/build/esm/manager';
import {SocketOptions} from 'socket.io-client/build/esm/socket';
import {AuthService} from '../../api/auth';
import type {TWebSocketOptions, TWebSocketUrl} from './websocket-service.d';

export class WebsocketService {
  private _ws: Socket;

  private constructor(
    url: string | Partial<ManagerOptions & SocketOptions>,
    options: Partial<ManagerOptions & SocketOptions>
  ) {
    this._ws = io(url, options);

    this._ws.on('unauthorized', async () => {
      this.disconnect();

      const token: string = await AuthService.refresh();

      localStorage.setItem('token', token);

      this._ws = io(url, {
        ...options,
        auth: {
          token: `Bearer ${token}`,
        }
      });
    });
  }

  public emit(eventName: string, ...args: unknown[]): void {
    this._ws.emit(eventName, ...args);
  }

  public on(eventName: string, callback: Function): void {
    this._ws.on(eventName, callback);
  }

  public disconnect(): void {
    this._ws.disconnect();
  }

  public static connect(
    url: TWebSocketUrl,
    options: TWebSocketOptions = {}
  ) {
    return new WebsocketService(url, {
      auth: {
        token: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}

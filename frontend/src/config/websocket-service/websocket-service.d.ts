import type {ManagerOptions} from 'socket.io-client/build/esm/manager';
import type {SocketOptions} from 'socket.io-client/build/esm/socket';

export interface IWebSocketService {
  emit: (eventName: string, ...args: unknown[]) => void;
  on: (eventName: string, callback: Function) => void;
  disconnect: () => void;
  connect: (url: TWebSocketUrl, options?: TWebSocketOptions) => IWebSocketService;
}

export type TWebSocketOptions = Partial<ManagerOptions & SocketOptions>;

export type TWebSocketUrl = string | TWebSocketOptions;
